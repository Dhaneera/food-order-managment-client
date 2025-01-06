"use client";
import React, { useState } from "react";
import Image from "next/image";
import registerAxios from "./register"; // Your API function
import { useMutation } from "@tanstack/react-query";

type RegisterPayload = {
  phoneNumber: string;
  password: string;
  role: string;
};

const statue = "/login-2.png";

const RegisterPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required.";
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
      localStorage.setItem("token", data.accessToken);
      alert("Signup successful!");
      window.location.href = "/dashboard";
    },
    onError: () => {
      alert("Signup failed. Please try again.");
    },
  });

  const isLoading = isPending;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      mutate({ phoneNumber, password, roleType:role });
    }
  };

  return (
    <div className="flex h-screen font-poppins">
      <div className="w-1/2 h-full">
        <Image
          src={statue}
          alt="Statue"
          className="object-cover w-full h-full"
          width={1000}
          height={1000}
        />
      </div>
      <div className="w-1/2 h-full flex items-center justify-center bg-white">
        <form className="w-3/4 max-w-md space-y-6" onSubmit={handleSignup}>
          <div>
            <h1 className="text-3xl font-bold mb-2">Let's get your food</h1>
            <p className="text-xs text-gray-600 mb-6">
              Fill the below information to get started
            </p>
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full border px-4 py-2 rounded-md shadow-sm ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
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
              className={`w-full border px-4 py-2 rounded-md shadow-sm ${
                errors.password ? "border-red-500" : "border-gray-300"
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
              className={`w-full bg-white border px-4 py-2 rounded-md shadow-sm ${
                errors.role ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none`}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="admin">Staff</option>
              <option value="admin">Piriven Student</option>
              <option value="student">Student</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black mt-3 text-white py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
          >
            {isLoading ? "Signing Up" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
