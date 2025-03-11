"use client"
import React, { useState } from "react";
import Image from "next/image";
import registerAxios from "./register"; // Your API function
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import Loader from "../components/Loader";
import { useRouter } from "next/navigation";
import { debug } from "console";

type RegisterPayload = {
  phoneNumber: string;
  name: string;
  password: string;
  role: string;
};

const statue = "/login-2.png";

const RegisterPage = () => {
   const router=useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [userInvalid, setuserInvalid] = useState(false);
  const [status,setStatus] = useState("")

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    if (!/^\d{10}$/.test(phoneNumber)) newErrors.phoneNumber = "Invalid phone number.";
    if (!name) newErrors.name = "Name is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!password || password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!role) newErrors.role = "Role is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: registerAxios,
    mutationKey: ["register"],
    onSuccess: (data: any) => {
      const { id, roles ,status} = data.data;
      setPhoneNumber("");
      setName("");
      setPassword("");
      setRole("");
      setStatus("");
      setErrors({});

      sessionStorage.setItem("userId", id.toString());
      sessionStorage.setItem("role", roles[0]?.name || ""); 

      if(sessionStorage.getItem("role")=="ROLE_STAFF"||sessionStorage.getItem("role")=="ROLE_PIRIVEN_STUDENT"){
        setStatus("PENDING")
      }
      
      sessionStorage.setItem("name",phoneNumber);
      sessionStorage.setItem("status",status)

    

    
      if(sessionStorage.getItem("role")=="ROLE_STAFF"){
        router.push('/internalStaffRegister');
      }else if(sessionStorage.getItem("role")=="ROLE_STUDENT"||"ROLE_PIRIVEN_STUDENT"){
        router.push('/studentRegister');
      }

      
    },
    onError: () => {
      setuserInvalid(true);
    },
  });

  const isLoading = isPending;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      mutate({ phoneNumber, name, password, roleType: role });
    }
  };

  return!isPending?(
    <div className="flex h-screen font-poppins">
      <div className="w-1/2 h-full max-lg:hidden">
        <Image 
          src={statue}
          alt="Statue"
          className="object-cover w-full h-full"
          width={1000}
          height={1000} 
          />
      </div>
      <div className="w-1/2 h-full flex items-center justify-center  max-lg:w-screen">
        <form className="w-3/4 max-w-md space-y-6" onSubmit={handleSignup}>
          <div>
            <h1 className="text-3xl font-bold mb-2">Let's get your food</h1>
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
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full border px-4 py-2 rounded-md shadow-sm ${errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full border px-4 py-2 rounded-md shadow-sm ${errors.name ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border px-4 py-2 rounded-md shadow-sm ${errors.password ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full bg-white border px-4 py-2 rounded-md shadow-sm ${errors.role ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none`}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="staff">Staff</option>
              <option value="piriven">Piriven Student</option>
              <option value="student">Student</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black mt-3 text-white py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
          >
            {isLoading && " Signing UpDirect to next " || "Direct to next page"}
          </button>
          <h2 className="text-sm md:ml-24 max-md:ml-2"> Have an account click here to <Link href='/login'><span className="text-red-700">Sign In</span></Link></h2>
        </form>
      </div>
    </div>
  ):(
    <Loader/>
  )
};

export default RegisterPage;