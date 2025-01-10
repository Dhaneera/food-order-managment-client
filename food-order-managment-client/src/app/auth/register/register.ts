import axios from "axios";
import { Console } from "console";

type RegisterPayload = {
    phoneNumber: string;
    name: string;
    password: string;
    roleType: string;
  };
  
  const registerAxios = async (payload: RegisterPayload) => {
    console.log(payload)
    console.log(process.env.NEXT_PUBLIC_BASE_URL);
    axios.post(process.env.NEXT_PUBLIC_BASE_URL+"/api/auth/register",payload).then((res:any)=> console.log(res.data))
  };
  
  export default registerAxios;