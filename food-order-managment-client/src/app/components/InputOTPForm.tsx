"use client"

// import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, ControllerRenderProps } from "react-hook-form"
// import { z } from "zod"

// import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast, Toaster } from "sonner"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import InputForm from "./InputFormResetPassword"




const InputOTPFrom = (props:any) =>{

    const[resetPassword,setResetPassword]=useState(false)
    const [serverOtp, setServerOtp] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      pin: "",
    },
  })
  
  useEffect(()=>{
    setInterval(()=>{
      setServerOtp('');
    },36000)
  },[serverOtp])

  console.log(serverOtp)
   async function fetchOtpMessage(email:string) {
    
    if (!email) return null;
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Mailing/send-otp?email=${email}`)
      setServerOtp(response.data)
      return  response.data
      
    } catch (error){
        console.error("Error fetching OTP:", error);
            throw error
    }
  }


  useQuery({
    queryKey:["otpMessage",props.mail],
    queryFn:()=> fetchOtpMessage(props.mail),
    
  })

  function handleSubmitOtp() {
    debugger
    const enteredOtp = form.getValues("pin");

    if (!enteredOtp) {
      toast("please enter otp before submission")
      return;
    }
 
    if (enteredOtp == serverOtp) {
      setResetPassword(true);
    } else {
      toast("Entered OTP is invalid or expired otp expires within 5 minutes please try again")
    }
  }

  return (
    <>  
      <Toaster />
    {resetPassword?(
        <InputForm  mail={props.mail} />
    ):(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitOtp)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }: { field: ControllerRenderProps<any, "pin"> }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button onClick={()=>handleSubmitOtp()}  type="submit">Submit</Button>
      </form>
    </Form>)}
    </>
  );
}
export default InputOTPFrom;