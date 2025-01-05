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

  const { mutate, status } = useMutation<unknown, unknown, RegisterPayload>({
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

  const isLoading = status === "pending";

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      mutate({ phoneNumber, password, role });
    }
  };

  return (
    <div className="flex h-screen">
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
        <form className="w-3/4 max-w-md space-y-4" onSubmit={handleSignup}>
          <h1 className="text-4xl font-bold text-center mb-8">Sign Up</h1>
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full border px-4 py-2 ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border px-4 py-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="role" className="block text-gray-700">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full border px-4 py-2 ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;