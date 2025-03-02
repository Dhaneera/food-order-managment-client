'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

interface ModalProps {
  title: string;
  isVisible: boolean;
  onClose: () => void;
  onDiscard: () => void;
  onSubmit: (formData: { name: string; contact: string; image: File | null }) => void;
}

const Modal = ({ title, isVisible, onClose, onDiscard, onSubmit }:any) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage]: any = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const mutation = useMutation({
    mutationFn: (): any => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append("name", name);
      const response = axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/images/upload?id=${sessionStorage.getItem("userId")}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
    },
    mutationKey: [image]
  })
  const handleSubmit = () => {
    mutation.mutate();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed w-screen h-screen inset-0 flex items-center justify-center bg-opacity-25 bg-black/30 z-50">
      <div className="bg-white rounded-md w-96 p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            ✖
          </button>
        </div>


        <form>

          <div
            className="flex flex-col items-center mb-6"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center relative overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-500 text-3xl">+</span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Drag image here <br /> or{" "}
              <label className="text-blue-500 cursor-pointer">
                Browse image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </p>
          </div>
        </form>


        <div className="flex  justify-center gap-4">
          <button
            onClick={onDiscard}
            className="px-4 py-2 text-red-700 bg-red-100 rounded-md hover:bg-red-200"
          >
            Discard
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-green-700 bg-green-100 rounded-md hover:bg-green-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
