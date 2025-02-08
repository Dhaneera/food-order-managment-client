import axios from "axios";


const studentRegisterAxios = async (payload: any) => {

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/save-more-info`,
            payload,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Error:", error);
        if (error.response) {
            console.error("Error Status:", error.response.status);
            console.error("Error Response Data:", error.response.data);
        } else if (error.request) {
            console.error("No Response Received:", error.request);
        } else {
            console.error("Request Error:", error.message);
        }
        throw error;

    }
}

export default studentRegisterAxios;