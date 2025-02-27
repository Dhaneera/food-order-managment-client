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
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError("");
                        }}
                        className={error ? "border-red-500" : ""}
                        
                    />
                    <Button onClick={handleClick} type="submit">
                        Send OTP Code
                    </Button>
                    {error && <p className="  text-red-500 text-sm">{error}</p>}
                </div>)}
        </>
    );
}