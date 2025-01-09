'use client'
import axios from "axios"

export default async function loginAxios(userDto:any){
    const url=process.env.NEXT_PUBLIC_BASE_URL+"/api/auth/login"
    console.log(url)
    console.log(userDto)
    return await axios.post(url,userDto)
    .then((res)=>res.data)
    .catch((error)=>console.log(error))
}