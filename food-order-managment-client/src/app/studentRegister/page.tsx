"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import Loader from '../components/Loader';
import studentRegisterAxios from './studentRegister';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner'
const studentRegister = (props: any) => {

    const statue = "/login-2.png";
    const router = useRouter();

    const [userInvalid, setuserInvalid] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [userId, setUserId] = useState<number | null>(null);

    const [input, setInput] = useState<{
        studentId: string;
        mail: string;
        faculity: string;
        gender: string;
        batch: string;
        stream: string;
        userId: number | null;  
    }>({
        studentId: "",
        mail: "",
        faculity: "",
        gender: "",
        batch: "",
        stream: "",
        userId: null,  
    });

    useEffect(() => {
        const storedUserId = sessionStorage.getItem("userId");
        if (storedUserId) {
            setUserId(Number(storedUserId));
            setInput(prev => ({
                ...prev,
                userId: Number(storedUserId),
            }));
        }
    }, []);

    
    function handleChange(e: any) {
        console.log(e.target.value)
        setErrors({});
        setInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    const mutation = useMutation({
        mutationFn: studentRegisterAxios,
        mutationKey: ["studentRegister"],
        onSuccess: () => {
            router.push('/')
        },
        onError: () => {
            setuserInvalid(true)
        }
    })

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            console.log("hello")
            toast.error("Please fill all the fields", {
                position: "bottom-left", description: "Validation Error please fill all data correctly."

            });
        } else {
            mutation.mutate(input);
        }
    };

    const validateForm = () => {
        debugger
        const newErrors: { [key: string]: string } = {};
        if (input.studentId == "") newErrors.studentId = "Student ID is required.";
        if (!/^\d{5,10}$/.test(input.studentId)) newErrors.studentId = "Invalid student ID.";
        if (input.mail == "") newErrors.mail = "Mail is required.";
        if (input.faculity == "") newErrors.faculity = "Faculity is required.";
        if (input.batch == "") newErrors.batch = "Batch is required.";
        if (input.stream == "") newErrors.stream = "Stream is required.";
        if (input.gender == "") newErrors.gender = " gender is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    return mutation.isPending ? (
        <Loader />) : (
        <div className='flex h-screen font-poppins'>
            <div className='w-1/2 h-full max-lg:hidden'>
                <Image
                    src={statue}
                    alt="Statue"
                    className="object-cover w-full h-full"
                    width={1000}
                    height={1000}
                />
                <div className='absolute bottom-0 left-0 p-4'>
                    <Toaster />
                </div>
            </div>
            <div className="w-1/2 h-full flex items-center justify-center  max-lg:w-screen">
                <form className="w-3/4 max-w-md space-y-6 " onSubmit={handleSignup}>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Let's Get To Know U!</h1>
                        <p className="text-xs text-gray-600 mb-6">

                            Fill in the form to verify it's really you we will get your food in a jiffy.
                        </p>
                        <div className={userInvalid ? `flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 ` : `hidden`} role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-medium">Alredy exists</span> user Alredy exists.
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
                            Student ID
                        </label>
                        <input
                            id="studentId"
                            value={input.studentId}
                            name="studentId"
                            onChange={handleChange}
                            placeholder='201320142015'
                            className={`w-full border px-4 py-2 rounded-md shadow-sm ${errors.mail ? "border-red-500" : "border-gray-300"
                                }  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.mail && <p className="text-red-500 text-sm mt-1">{errors.mail}</p>}
                    </div>
                    <div>
                        <label htmlFor="mail" className="block text-sm font-medium text-gray-700 mb-2">
                            E-mail
                        </label>
                        <input
                            id="mail"
                            value={input.mail}
                            name="mail"
                            onChange={handleChange}
                            placeholder='somone@mail.com'
                            className={`w-full border px-4 py-2 rounded-md shadow-sm ${errors.mail ? "border-red-500" : "border-gray-300"
                                }  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.mail && <p className="text-red-500 text-sm mt-1">{errors.mail}</p>}
                    </div>
                    <div>
                        <label htmlFor="faculity" className="block text-sm font-medium text-gray-700 mb-2">
                            Faculity
                        </label>
                        <input
                            id="faculity"
                            value={input.faculity}
                            onChange={handleChange}
                            name="faculity"
                            placeholder='Engineering'
                            className={`w-full bg-white border px-4 py-2 rounded-md shadow-sm ${errors.faculity ? "border-red-500" : "border-gray-300"
                                }  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none`}
                        >
                        </input>
                        {errors.faculity && <p className="text-red-500 text-sm mt-1">{errors.faculity}</p>}
                    </div>
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                            Gender
                        </label>
                        <select
                            id="gender"
                            value={input.gender}
                            onChange={handleChange}
                            name='gender'
                            className={`w-full bg-white border px-4 py-2 rounded-md shadow-sm ${errors.gender ? "border-red-500" : "border-gray-300"
                                }  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none`}
                        >
                            <option value="" disabled>
                                !--- Select Gender --!
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="malep">Male-Priest</option>
                            <option value="femalep">Female-Priest</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                    </div>
                    <div>
                        <label htmlFor="batch" className="block text-sm font-medium text-gray-700 mb-2">
                            Batch/Year
                        </label>
                        <input
                            id="batch"
                            value={input.batch}
                            onChange={handleChange}
                            placeholder='2013'
                            name='batch'
                            className={`w-full border px-4 py-2 rounded-md shadow-sm ${errors.batch ? "border-red-500" : "border-gray-300"
                                }  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.batch && <p className="text-red-500 text-sm mt-1">{errors.batch}</p>}
                    </div>
                    <div>
                        <label htmlFor="stream" className="block text-sm font-medium text-gray-700 mb-2">
                            stream
                        </label>
                        <input
                            id="stream"
                            value={input.stream}
                            onChange={handleChange}
                            placeholder='subject'
                            name='stream'
                            className={`w-full border px-4 py-2 rounded-md shadow-sm ${errors.stream ? "border-red-500" : "border-gray-300"
                                }   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.stream && <p className="text-red-500 text-sm mt-1">{errors.stream}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full bg-black mt-3 text-white py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                    >
                        {mutation.isPending ? "Signing Up" : "Sign Up"}

                    </button>
                </form>
            </div>
        </div>
    )
}

export default studentRegister;
