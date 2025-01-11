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
    <div className="w-[95%] bg-white h-[20%] flex py-4 shadow-lg rounded-lg">
      <div className="w-[30%]">
        <Image src={image} alt={name} className="scale-125 py-2 px-4" />
      </div>
      <div className="items-center flex w-[70%] justify-around gap-5 px-3 py-3">
        <h3 className="font-sans font-medium">{name}</h3>
        <div className="flex items-center gap-5">
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
            className="rounded-full flex justify-center items-center h-10 w-10 bg-[#e6f6e9] cursor-pointer"
            onClick={handleDecrease}
          >
            <Minus strokeWidth={1.25} />
          </div>
          <h5>Rs {(price).toFixed(2)}</h5>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;