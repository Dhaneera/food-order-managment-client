'use client'
import router from "next/router";
import React from "react";

const ConfirmationPage = () => {

    const mapOfList = [
        "LN18661","BR18661","DN18661"
    ]

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your order submited successfully.
          Your Meal Id's are <p>{mapOfList.map((obj)=>{
                return(
                    <p>{obj}</p>
                )
          })}</p>
        </p>
        <button
            onClick={() => router.push("/mealOrder")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};
export default ConfirmationPage;