import React, { useState } from "react";

const GuessModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={toggleModal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Modal
      </button>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Modal Content */}
          <div className="bg-white rounded-lg w-96 p-6 shadow-lg relative">
            {/* Modal Title */}
            <h2 className="text-lg font-semibold mb-4">New Student</h2>

          
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
           
                <span className="text-gray-500 text-3xl">+</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Drag image here <br /> or{" "}
                <span className="text-blue-500 cursor-pointer">Browse image</span>
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter supplier name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Mail Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mail
                </label>
                <input
                  type="text"
                  placeholder="Enter product"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Contact Number Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  placeholder="Enter supplier contact number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-red-100 text-red-500 rounded-md hover:bg-red-200"
              >
                Discard
              </button>
              <button className="px-4 py-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200">
                Add Supplier
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GuessModal;
