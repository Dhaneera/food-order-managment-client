import React, { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import image from '../../../public/breakfast.png';

const FoodCard = ({
  name,
  price,
  onUpdateQuantity,
}: {
  name: string;
  price: number;
  onUpdateQuantity: (quantity: number) => void;

}) => {

  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onUpdateQuantity(newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onUpdateQuantity(newQuantity);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 py-4 lg:hidden border-b-2 border-gray-200 ">
        <div className="flex flex-col">
          <h3 className="font-sans font-medium">{name}</h3>
          <h4>Rs{price.toFixed(2)}</h4>
        </div>
        <div className="relative flex-1 flex justify-end">

          <div className="flex justify-end w-24 h-24">
            <Image
              src={image}
              alt={name}
              className="rounded-lg  -z-50 "
              width={200}
              height={200}
            />
            <div className='absolute justify-center px-2 m-3 mt-1  rounded-full   bg-[#E6F5E9] text-black  '>
              {quantity}
            </div>
            <div
              className="absolute mr-[11%] bottom-2   rounded-full flex justify-center items-center h-8 w-8 bg-[#e6f6e9] cursor-pointer "
              onClick={handleDecrease}
            >
              <Minus strokeWidth={1.25} />
            </div>
            <div
              className="absolute bottom-2 right-2 rounded-full flex justify-center items-center h-8 w-8 bg-[#e6f6e9] cursor-pointer"
              onClick={handleIncrease}
            >
              <Plus strokeWidth={1.25} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[95%] bg-white h-[20%] flex py-4 shadow-lg rounded-lg max-lg:hidden ">
        <div className="w-[30%] max-lg:ml-[-15%] ">
          <Image src={image} alt={name} className="scale-125 py-2 px-4 max-lg:scale-[55%] " />
        </div>
        <div className="items-center flex w-[70%] justify-around gap-5 px-3 py-3">
          <h3 className="font-sans font-medium">{name}</h3>
          <div className="flex items-center gap-5 max-lg:gap-8">
            <div
              className="rounded-full flex justify-center items-center h-10 w-10 bg-[#e6f6e9] cursor-pointer"
              onClick={handleIncrease}
            >
              <Plus strokeWidth={1.25} />
            </div>
            <div>
              <p className="font-sans font-semibold">{quantity}</p>
            </div>
            <div
              className="rounded-full flex justify-center items-center h-10 w-10 bg-[#e6f6e9] cursor-pointer "
              onClick={handleDecrease}
            >
              <Minus strokeWidth={1.25} />
            </div>
            <h5>Rs{(price).toFixed(2)}</h5>
          </div>
        </div>
      </div>
    </>

  );
};

export default FoodCard;