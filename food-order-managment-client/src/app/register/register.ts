import axios from "axios";

type RegisterPayload = {
    phoneNumber: string;
    password: string;
    roleType: string;
  };
  
  const registerAxios = async (payload: RegisterPayload) => {
    console.log(payload)
    axios.post(process.env.NEXT_PUBLIC_BASE_URL+"/api/auth/register",payload)
  };
  
  export default registerAxios;