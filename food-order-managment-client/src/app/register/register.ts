import axios from "axios";

type RegisterPayload = {
  phoneNumber: string;
  name: string;
  password: string;
  roleType: string;
};

const registerAxios = async (payload: RegisterPayload) => {
  console.log(payload);
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  
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
    console.log(response.data);
  } catch (error) {
    console.error("Registration error:", error.response || error);
  }
};

export default registerAxios;