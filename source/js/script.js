      // Function to handle the fetched order data
      let form = document.getElementById('dynamicForm');
      const errorDiv = document.getElementById('error');
        // Form Submission Handler
        form.addEventListener('submit', async function(event) {
  event.preventDefault();
  event.stopPropagation();
  
  const submitBtn = document.getElementById('fetchOrder');
  submitBtn.classList.add('loading');
  
  form.classList.add('was-validated');
  
  if (form.checkValidity()) {
      try {
          await handleFetchOrder();
      } catch (error) {
          console.error('Error:', error);
      } finally {
          submitBtn.classList.remove('loading');
      }
  } else {
      submitBtn.classList.remove('loading');
  }
}, false);
      async function handleFetchOrder(){
          const orderNumber = document.getElementById('orderNumber').value.trim();
          const errorDiv = document.getElementById('error');

          if (!orderNumber) {
              errorDiv.textContent = '⚠ Please enter an order number.';
              return;
          }

          try {
              errorDiv.textContent = "🔄 Fetching order details...";

              // Call the reusable dataProcess function
              const orderData = await dataProcess(orderNumber);
              console.log('Fetched Order Data:', orderData);

              // ✅ Display success message
              errorDiv.textContent = "✅ Order Loaded Successfully!";

              // ✅ Populate the HTML with the fetched data
              changeTitle(orderData.order_no);
              populateOrderDetails(orderData);
              updateFabricDescription();
              // Call the function to update page numbers
              updatePageNumbers();

              // Hide form with fade-out effect
              hideForm();

              // Show all-content with fade-in effect
              showContent();
          } catch (error) {
              console.error('Error:', error);
              errorDiv.textContent = `❌ ${error.message}`;
          }
      }

      // Function to fetch image URLs from order data
      function fetchImageUrls(orderData) {
          const imageUrls = [];

          if (orderData.items && orderData.items.length > 0) {
              orderData.items.forEach(item => {
                  if (item.factory_products && item.factory_products.length > 0) {
                      item.factory_products.forEach(product => {
                          if (product.front_image) {
                              imageUrls.push(product.front_image);
                          }
                          if (product.back_image) {
                              imageUrls.push(product.back_image);
                          }
                      });
                  }
              });
          }

          return imageUrls;
      }

      // Function to populate order details in the UI
      function populateOrderDetails(orderData) {
          if (orderData) {
              const imageUrls = fetchImageUrls(orderData);
              console.log('Image URLs:', imageUrls);

              // Update customer and company names
              document.querySelectorAll('.customerName').forEach(element => {
                  element.innerHTML = orderData.customer_name || 'N/A';
              });

              document.querySelectorAll('#companyName').forEach(element => {
                  element.innerHTML = orderData.company_name || 'N/A';
              });
              document.querySelectorAll(".artnumber").forEach(element => {
                  element.innerHTML = `<strong class="pe-1" >Art#:</strong>${orderData.order_no}`
              })
              // Update image sources
              if (imageUrls[0]) {
                  document.getElementById("imageFront").src = imageUrls[0];
              }
              if (imageUrls[1]) {
                  document.getElementById("imageBack").src = imageUrls[1];
              }
          }
      }

      // Function to update page numbers
      function updatePageNumbers() {
          const pages = document.querySelectorAll('.page');
          const pageNumberElements = document.querySelectorAll('.page-number');
          const totalPages = pages.length;

          pages.forEach((page, index) => {
              const pageNumber = index + 1;

              if (pageNumberElements[index]) {
                  pageNumberElements[index].innerHTML = `Page: ${pageNumber} of ${totalPages}`;
              }
          });
      }

      // Function to hide the form with a fade-out effect
      function hideForm() {
          const form = document.getElementById('form');
          form.style.opacity = "0";
          form.style.transform = "translateY(-20px)";

          setTimeout(() => {
              form.style.cssText = "display:none!important; opacity:0; transform:translateY(-20px);";
          }, 800); // Match the duration of the CSS transition
      }

      // Function to show the content with a fade-in effect
      function showContent() {
          const content = document.getElementById('all-content');
          content.style.display = "block";

          setTimeout(() => {
              content.style.opacity = "1";
              content.style.transform = "translateY(0)";
          }, 100);
      }
      function changeTitle(newTitle) {
          document.title = ` ${newTitle}_Custimoo`;
      }


    //   Function to updata fabric Description
    function updateFabricDescription() {
        // Get values from form inputs
        const shell1 = document.getElementById('shellFabric1val').value;
        const shell2 = document.getElementById('shellFabric2val').value;
        const shell3 = document.getElementById('shellFabric3val').value;
        const lining1 = document.getElementById('liningFabric1val').value;
        const lining2 = document.getElementById('liningFabric2val').value;
        const lining3 = document.getElementById('liningFabric3val').value;
    
        // Update shell fabrics display
        document.getElementById('shellFabric1').innerHTML = 
        `<strong>Shell Fabric # 2:</strong> ` + 
        (shell1 ? `<span class="text-danger font-weight-bold">${shell1}</span>` : 
                 `<span class="text-muted">Not specified</span>`);
            document.getElementById('shellFabric2').innerHTML = 
            `<strong>Shell Fabric # 2:</strong> ` + 
            (shell2 ? `<span class="text-danger font-weight-bold">${shell2}</span>` : 
                     `<span class="text-muted">Not specified</span>`);
        
        document.getElementById('shellFabric3').innerHTML = 
            `<strong>Shell Fabric # 3:</strong> ` + 
            (shell3 ? `<span class="text-danger font-weight-bold">${shell3}</span>` : 
                     `<span class="text-muted">Not specified</span>`);
    
        // Update lining fabrics display
        document.getElementById('liningFabric1').innerHTML = 
            `<strong>Lining Fabric # 1:</strong> ` + 
            (lining1 ? `<span class="text-danger font-weight-bold">${lining1}</span>` : 
                      `<span class="text-muted">Not specified</span>`);
        
        document.getElementById('liningFabric2').innerHTML = 
            `<strong>Lining Fabric # 2:</strong> ` + 
            (lining2 ? `<span class="text-danger font-weight-bold">${lining2}</span>` : 
                      `<span class="text-muted">Not specified</span>`);
        
        document.getElementById('liningFabric3').innerHTML = 
            `<strong>Lining Fabric # 3:</strong> ` + 
            (lining3 ? `<span class="text-danger font-weight-bold">${lining3}</span>` : 
                      `<span class="text-muted">Not specified</span>`);
    }
    
      // Function to print the document
      function printDocument() {
          window.print();
      }