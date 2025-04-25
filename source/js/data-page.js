// Credentials
const AUTH_URL = "https://devapi.custimoo.com/api/vendor/get-auth-token";
const API_BASE_URL = "https://devapi.custimoo.com/api/vendor/order";
const USERNAME = "test@apiadmin.com";
const PASSWORD = "123456";

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

        const data = await response.json();

        if (!data.success || !data.result || !data.result.order || data.result.order.length === 0) {
            throw new Error('⚠ No order found with the provided order number.');
        }

        return data.result.order;

    } catch (error) {
        console.error("Error in dataProcess:", error.message);
        throw error;
    }
};
