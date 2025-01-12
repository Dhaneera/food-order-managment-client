import React from 'react';
import Image from 'next/image';
import img from '../../../public/breakfast.png';

const CartItem = ({ cartItems, subtotal }:any) => {
  return subtotal!=0?(
    <div className="w-full h-full px-3 flex gap-2 flex-col py-10 ">
      {cartItems?.map((item:any, index:any):any => (
        item.quantity!=0?(
        <div
          key={index}
          className="w-full flex justify-between items-center border-gray-500 border-2 rounded-md px-2 py-1"
        >
          <Image src={img} alt={item.name} className="w-24 h-24" />
          <p>{item.name}</p>
          <h3 className="px-1 font-medium">{item?.price?.toFixed(2)}</h3>
        </div>
        ):(<div key={index}></div>)
        
      ))}
      <div className="w-full border-t-2 flex flex-col mt-6">
        <div className="flex justify-around pt-4">
          <h3 className="font-sans font-thin">Subtotal</h3>
          <h2 className="font-poppins font-medium">{subtotal?.toFixed(2)}</h2>
        </div>
        <div className="flex justify-around pt-4">
          <h3 className="font-sans font-thin">Grand Total</h3>
          <h2 className="font-poppins font-bold">{subtotal?.toFixed(2)}</h2>
        </div>
        <button className="px-3 py-2 ml-auto mr-auto my-2 rounded-full w-[60%] text-[#6cd598] bg-[#e6f6e9] hover:bg-[#6fdc83] hover:text-[#b9e7cc]">
          Place Order
        </button>
      </div>
    </div>
  ):(
    <div className="w-full h-full flex justify-center items-center">
      <h1 className="font-sans text-3xl font-semibold">No items in cart</h1>
    </div>
  );
};

export default CartItem;
