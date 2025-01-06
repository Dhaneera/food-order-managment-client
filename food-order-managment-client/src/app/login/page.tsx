"use client";
import React, { useState } from "react";
import Image from "next/image";
import LoginImage1 from "@/../public/login-1.jpeg";
import LoginImage2 from "@/../public/login-2.png";
import LoginImage3 from "@/../public/login-3.svg";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import loginAxios from "./login";
import Loader from "../components/Loader";

const Login = () => {


  const { error, isError, isIdle, isSuccess, status, data, isPending, mutate } = useMutation({
    mutationFn: loginAxios,
    mutationKey:["login"],
    onSuccess: (data: any) => {
      localStorage.setItem("token", data.accessToken);
    },
    onError: (error) => {
      setPasswordInvalid(true);
    },
  })


  const images = [
    {
      image: LoginImage1,
      alt: "Image of a temple",
    },
    {
      image: LoginImage2,
      alt: "Statue of Lord buddha",
    },
    {
      image: LoginImage3,
      alt: "monk worshipping",
    },
  ];

  const [student, setStudent] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ phoneNumber: "", password: "" });
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const validateFields = () => {
    const newErrors = { phoneNumber: "", password: "" };

    // Phone number validation
    if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    }

    // Password validation
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleLoginSelection = (e: any) => {
    setStudent((prevState) => !prevState);
    console.log(e.target.name);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
    console.log(isPasswordVisible);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      console.log("Form submitted successfully");
      mutate({username:phoneNumber,password})
    } else {
      console.log("Validation errors:", errors);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    setPasswordInvalid(false);
    if (errors.phoneNumber) {
      setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordInvalid(false);
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  return !isPending?(
    <div className="w-screen h-screen flex">
      <div className="w-[52%] max-md:w-full  h-full flex flex-col justify-center gap-5 items-center">
        <h3 className=" text-3xl font-bold mb-2 font-poppins">Welcome Back</h3>
        {/* responsive button */}
        <div className="flex justify-center items-center" onSubmit={handleSubmit}>
          <div className="flex bg-gray-200 rounded-full px-1 ">
            <button
              className={
                student
                  ? "px-12 py-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 font-medium focus:outline-none transition-all duration-300"
                  : "px-12 py-2 rounded-full bg-[#C57E2c] text-white font-medium focus:outline-none transition-all duration-300"
              }

              onClick={(e) => handleLoginSelection(e)}
            >
              Student
            </button>
            <button
              className={
                !student
                  ? "px-12 py-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 font-medium focus:outline-none transition-all duration-300"
                  : "px-12 py-2 rounded-full bg-black text-white font-medium focus:outline-none transition-all duration-300"
              }
              name="staff-btn"
              onClick={(e) => handleLoginSelection(e)}
            >
              Staff
            </button>
          </div>
        </div>
        <div className="w-[60%] flex flex-col gap-6 pt-5">
          <div>
            <div className={passwordInvalid?`flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 `:`hidden`} role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Invalid</span> Please check the username and password.
              </div>
            </div>
            <input
              type="text"
              id="phone-number"
              className={`bg-gray-50 border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Phone Number"
              required
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
            )}
          </div>
          <div>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                className={`bg-gray-50 border ${errors.password ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10`}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                onClick={() => togglePasswordVisibility()}
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
        </div>
        <button
          className={
            student
              ? "bg-transparent hover:bg-gray-500 w-[60%] mt-5 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded-lg"
              : "bg-transparent hover:bg-[#C57E2c] w-[60%] mt-5 text-[#C57E2c] font-semibold hover:text-white py-2 px-4 border border-[#C57E2c] hover:border-transparent rounded-lg"
          }
          onClick={handleSubmit}
        >
          Login
        </button>
        <h2 className="text-sm">Don t have an account click here to <Link href='/register'><span className="text-red-700">Sign Up</span></Link></h2>
      </div>

      <div className="w-[48%] max-md:hidden h-full">
        <Image
          src={student ? images[1].image : images[2].image}
          alt={student ? images[1].alt : images[2].alt}
          className="object-cover w-full h-full"
        ></Image>
      </div>
    </div>
  ):(
    <Loader/>
  )
};

export default Login;
