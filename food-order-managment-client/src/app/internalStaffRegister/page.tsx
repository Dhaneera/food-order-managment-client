"use client"
import React, { use, useEffect, useState } from 'react'
import Image from "next/image";
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import statue from '../../../public/login-3.svg'
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import registerInternalStaff from './internalRegister';
import { useRouter } from 'next/navigation';
import Loader from '../components/Loader';


const staffRegister = () => {

    const route = useRouter();

    const [userInvalid, setuserInvalid] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [userId, setUserId] = useState<number | null>(null);
    const [input, setInput] = useState({
        email: "",
        department: "",
        gender: "",
        nic: "",
        isInternal: false,
        userId: null as number | null, // Ensure type consistency
    });

    useEffect(() => {
        if (typeof window !== "undefined") { // Ensure it's running on the client-side
            const storedUserId = sessionStorage.getItem("userId");
            if (storedUserId) {
                const parsedUserId = Number(storedUserId);
                setUserId(parsedUserId);
                setInput(prev => ({
                    ...prev,
                    userId: parsedUserId, // Ensures type consistency
                }));
            }
        }
    }, []);


    function handleChange(e: any) {
        debugger
        setErrors({})
        setInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    const mutaion = useMutation({
        mutationFn:registerInternalStaff,
        mutationKey: ["registerInternalStaff"],
        onSuccess: () => {
            route.push('/accessError')
         },
        onError: () => {
            setuserInvalid(true)
         }
    })

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Please fill all the fields", {
                position: "bottom-left", description: "Validation Error please fill all data correctly."

            });
        } else {
            input.isInternal = true;
            mutaion.mutate(input);
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        debugger
        if (input.email == "") newErrors.mail = "Mail is required.";
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.email)) {
            newErrors.mail = "Invalid email address.";
        }
        if (input.gender == "") newErrors.gender = " gender is required.";
        if (!/^\d{12}$|^\d{9}V$/.test(input.nic)) {
            newErrors.nic = "Invalid NIC. Enter either 12 digits or 9 digits followed by 'V'.";
        }
        if (input.department == "") newErrors.department = "Department is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    return mutaion.isPending?(
        <Loader/>):(
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
                <form className="w-3/4 max-w-md space-y-6" onSubmit={handleSignup}>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Internal Staff Registration</h1>
                        <p className="text-xs text-gray-600 mb-6">
                            Fill the below information to get started
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
                        <label htmlFor="nic" className="block text-sm font-medium text-gray-700 mb-2">
                            Nic
                        </label>
                        <input
                            id="nic"
                            value={input.nic}
                            onChange={handleChange}
                            placeholder='national Identity Card Number'
                            name='nic'
                            className={`w-full border px-4 py-2 rounded-md shadow-sm ${errors.nic ? "border-red-500" : "border-gray-300"
                                }   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.nic && <p className="text-red-500 text-sm mt-1">{errors.nic}</p>}
                    </div>
                    <div>
                        <label htmlFor="mail" className="block text-sm font-medium text-gray-700 mb-2">
                            E-mail
                        </label>
                        <input
                            id="mail"
                            value={input.email}
                            name="email"
                            onChange={handleChange}
                            placeholder='somone@mail.com'
                            className={`w-full border px-4 py-2 rounded-md shadow-sm ${errors.mail ? "border-red-500" : "border-gray-300"
                                }  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.mail && <p className="text-red-500 text-sm mt-1">{errors.mail}</p>}
                    </div>
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                            Department
                        </label>
                        <select
                            id="department"
                            value={input.department}
                            onChange={handleChange}
                            name="department"
                            className={`w-full bg-white border px-4 py-2 rounded-md shadow-sm ${errors.department ? "border-red-500" : "border-gray-300"
                                }  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none`}
                        >
                            <option value="" disabled>
                                !--- Select Department --!
                            </option>
                            <option value="it">IT</option>
                            <option value="bussiness">Bussiness</option>
                            <option value="art">Art</option>
                        </select>
                        {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
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

                    <button
                        type="submit"
                        disabled={mutaion.isPending}
                        className="w-full bg-black mt-3 text-white py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                    >
                        {mutaion.isPending ? "Signing Up" : "Sign Up"}

                    </button>
                    <h2 className="text-sm">Not Working Internally Click Here <Link href='/externalStaffRegister'><span className="text-red-700"> I am an External Staff member</span></Link></h2>
                </form>
            </div>
        </div>
    )

}
export default staffRegister;
