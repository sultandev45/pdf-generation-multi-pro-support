// Credentials
const AUTH_URL = "https://devapi.custimoo.com/api/vendor/get-auth-token";
const API_BASE_URL = "https://devapi.custimoo.com/api/vendor/order";
const USERNAME = "test@apiadmin.com";
const PASSWORD = "123456";
// ========================
// DOM Elements
// ========================

const allContent = document.getElementById('all-content');
let form = document.getElementById('dynamicForm');
const errorDiv = document.getElementById('error');
let title = '';

// Function to fetch JWT token
const getJwtToken = async () => {
    try {
        const response = await fetch(AUTH_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: USERNAME,
                password: PASSWORD
            })
        });

        const responseText = await response.text();
        //console.log("🔍 Raw auth response text:", responseText);

        if (!response.ok) {
            throw new Error(`Auth failed ❌: ${response.status}`);
        }

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (jsonError) {
            console.error("❗ Failed to parse JSON:", jsonError);
            throw new Error("Auth API did not return valid JSON");
        }

        // console.log("✅ Parsed auth response:", data);

        // ✅ Correct path to token
        const token = data?.result?.token;
        if (!token) {
            throw new Error("No token found in response ⚠");
        }

        return token;
    } catch (error) {
        console.error("Error in getJwtToken:", error.message);
        throw error;
    }
};


// Function to fetch order data with JWT token
const dataProcess = async (orderNumber) => {
    let data;
    try {
        const token = await getJwtToken(); // get new JWT token
        const response = await fetch(`${API_BASE_URL}/${orderNumber}/techpack`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const responseText = await response.text();

            console.error("Raw response body:", responseText);
            throw new Error(`HTTP error! status: ${response.status} ❌ Please check the order number.`);
        }
        
        data = await response.json();
        // Convert JSON to a Blob (file-like object)
        // const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        // // Create a temporary URL for the Blob
        // const url = URL.createObjectURL(blob);
        // // Create a hidden <a> element to trigger download
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = 'single-product-response.json'; // Filename
        // a.click(); // Trigger download
        // // Clean up
        // URL.revokeObjectURL(url);
        if (!data.success || !data.result || !data.result.order) {
            throw new Error('⚠ No order found with the provided order number.');
        }

        return data.result.order;

    } catch (error) {
        console.error("Error in dataProcess:", error.message);
        throw error;
    }
};
