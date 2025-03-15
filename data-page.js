const BEARER_TOKEN = "Your Token";
        const API_BASE_URL = "API urll";

        // Reusable function to fetch order data
        let orderData = null; 
        const dataProcess = async (orderNumber) => {
            try {
                // Fetch order data from API
                const response = await fetch(`${API_BASE_URL}?order_no=${orderNumber}`, {
                    method: "GET",
                    headers: { 'Authorization': `Bearer ${BEARER_TOKEN}` }
                });

                if (!response.ok) {
                    throw new Error('❌ Failed to fetch order details. Please check the order number.');
                }

                const data = await response.json();

                if (!data.success || !data.result || !data.result.orders || data.result.orders.length === 0) {
                    throw new Error('⚠ No order found with the provided order number.');
                }

                // Return the fetched order data
                return data.result.orders[0];
            } catch (error) {
                console.error("Error in dataProcess:", error.message);
                throw error; // Re-throw the error for handling in the calling function
            }
        };
    

