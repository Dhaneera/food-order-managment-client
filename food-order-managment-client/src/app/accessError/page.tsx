import React from 'react';

const Page = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg text-center">
        <h3 className="font-sans font-bold text-2xl text-gray-800">
          Account status is currently not active. Please make sure you are an active user. 
        </h3>
        <p className="mt-4 text-gray-600">
          If you are an Employee or Piriven student, please make sure to get your account approved by an admin.
        </p>
      </div>
    </div>
  );
};

export default Page;
