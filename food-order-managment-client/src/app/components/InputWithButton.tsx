import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import InputOTPForm from "./InputOTPForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function InputWithButton() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [inputOtpFrom, setInputOtpFrom] = useState(false)


    const mutaion = useMutation({
        mutationKey:[],
        mutationFn:validateMail,
        onError(error:any) {
            setError("something went wrong.")
        },
    })


    async function validateMail(mail:String){
        try {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Mailing/check-mail?mail=${mail}`).then((res)=>{
                if (res.data !=null) {
                    setInputOtpFrom(true)
                }else{
                    setError("User not registered for this mail.")
                }
            })
        } catch (error) {
            throw error
        }
    }


    function handleClick(): void {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Invalid mail.");
            return;
        }
        mutaion.mutate(email)
    }

    return (
        <>
            {inputOtpFrom ? (
                <InputOTPForm mail={email} />) : (
                <div className="md:flex w-screen md:justify-center  max-w-sm items-center space-x-2 max-md:ml-[20%]">
                    <h1 className="text-2xl font-bold flex-none mb-10 md:absolute md:mb-40 md:ml-4  ml-12  font-serif">Reset Password</h1>

                    <Input className="w-full max-md:w-3/4"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError("");
                        }}
                       
                        
                    />
                    <Button className=" hover:bg-slate-600 max-md:mt-8 max-md:w-3/4" onClick={handleClick} type="submit">
                        Send OTP Code
                    </Button>
                    {error && <p className=" absolute max-md:mt-[-60]  md:mt-20  text-red-500 text-sm">{error}</p>}
                </div>)}
        </>
    );
}