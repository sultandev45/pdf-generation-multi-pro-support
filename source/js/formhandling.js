// @@@@@ Image Handling  @@@@@@@@@
// Function to handle image upload and display preview
// Handle number graphics upload
function handleNumberImageUpload(file) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        // Update all number logos
        document.querySelectorAll('.number-logo').forEach(img => {
            img.src = e.target.result;

        });

        // Show measurement arrows for number containers

    };

    reader.readAsDataURL(file);
}

// Handle name graphics upload
function handleNameImageUpload(file) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        // Update all name logos
        document.querySelectorAll('.name-logo').forEach(img => {
            img.src = e.target.result;

        });


    };

    reader.readAsDataURL(file);
}
// Updated validation function
function validateImageFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    return validTypes.includes(file.type) ||
        ['.jpg', '.jpeg', '.png', '.svg', '.webp'].includes(fileExtension);
}

// Form Submission Handler
form.addEventListener('submit', async function (event) {
    event.preventDefault();
    event.stopPropagation();
    // @@@ IMAGE FUNCTION CALL @@@@@
    const formData = new FormData(this);
    const numberImage = formData.get('numberGraphics');
    const nameImage = formData.get('nameGraphics');

    // Handle number image
    if (numberImage && numberImage.size > 0) {
        if (!validateImageFile(numberImage)) {
            alert('Please upload a valid image file for number graphics');
            return;
        }
        handleNumberImageUpload(numberImage);
    }

    // Handle name image
    if (nameImage && nameImage.size > 0) {
        if (!validateImageFile(nameImage)) {
            alert('Please upload a valid image file for name graphics');
            return;
        }
        handleNameImageUpload(nameImage);
    }
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
