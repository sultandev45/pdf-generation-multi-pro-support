// Configuration
const BEARER_TOKEN = "$2y$10$Tq4eYtrjmBHJ.58xf12E8.RSwwmYeBtidjB0PtYKF6mt6J4PzsfIu";
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
            
            throw new Error( `HTTP error! status: ${response.status} ❌ Please check the order number.`);
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







