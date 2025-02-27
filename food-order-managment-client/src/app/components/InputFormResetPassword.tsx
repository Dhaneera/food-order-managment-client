"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
// import { toast } from "@/components/hooks/use-toast"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
})


export default function InputForm(props: any) {

    const [error, setError] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [Mail, setMail] = useState("");
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
    })

    console.log(Mail)

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("You submitted the following values:", {

            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    async function resetPassword(Mail: any, newPassword: any) {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/resetPassword`, {
                mail: Mail,
                newPassword: newPassword
            });
            return response.data;
        } catch (error) {
            console.error("Error resetting password:", error);
            throw error;
        }
    }


    const mutaion = useMutation({
        mutationKey: [],
        mutationFn: () => resetPassword(props.Mail, newPassword),
        onSuccess(data) {
            if (data != null) {
                console.log(data)
                router.push("/")
            }
        },
        onError(error) {
            setError("Something went wrong")
        }
    })

    function submitNewPasswordHandler() {
        mutaion.mutate()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter the new password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Confirm the new password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button onClick={() => submitNewPasswordHandler()} type="submit">Reset Paasword</Button>
            </form>
        </Form>
    )
}




