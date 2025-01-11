import axios from "axios";

type RegisterPayload = {
  phoneNumber: string;
  name: string;
  password: string;
  roleType: string;
};

const registerAxios = async (payload: RegisterPayload) => {
  console.log("Payload:", payload);
  console.log("Base URL:", process.env.NEXT_PUBLIC_BASE_URL);

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
      payload,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response Data:", response.data);
    return response.data;
  } catch (error: any) {
    // Log the full error object
    console.error("Error:", error);

    // Log specific details if available
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Error Status:", error.response.status);
      console.error("Error Response Data:", error.response.data);
    } else if (error.request) {
      // Request was made but no response was received
      console.error("No Response Received:", error.request);
    } else {
      // Something else happened during request setup
      console.error("Request Error:", error.message);
    }

    throw error; // Re-throw the error if needed
  }
};

export default registerAxios;