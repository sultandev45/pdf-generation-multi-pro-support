// Configuration
const BEARER_TOKEN = "$2y$10$dPY8.xCTi2H9M.VrPXsLOugow7/.MfQMJv6HgsJ0brQg9Dx0kT0/O";
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
            throw new Error('❌ Failed to fetch order details. Please check the order number.');
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







