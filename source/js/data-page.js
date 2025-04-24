// Configuration
const BEARER_TOKEN = "$2y$10$NH1fFD7jWmrsy52.YHkXcu43c49Amuk1cUECtAbwZOa86oI8Ng5vm".trim();
const API_BASE_URL = "https://devapi.custimoo.com/api/vendor/order";

// Reusable function to fetch order data
let orderData = null;

const dataProcess = async (orderNumber) => {
    try {
        // Fetch order data from API
        const response = await fetch(`${API_BASE_URL}/${orderNumber}/techpack`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${BEARER_TOKEN}` }
        });

        if (!response.ok) {
            const responseText = await response.text(); // read before throwing
            console.error("Raw response body:", responseText);
            throw new Error(`HTTP error! status: ${response.status} ❌ Please check the order number.`);
        }

        const data = await response.json();
         
       
        
        if (!data.success || !data.result || !data.result.order || data.result.order.length === 0) {
            throw new Error('⚠ No order found with the provided order number.');
        }

        // Return the fetched order data
        return data.result.order;

    } catch (error) {
      
        console.error("Error in dataProcess:", error.message);
        throw error; // Re-throw the error for handling in the calling function
    }
};







