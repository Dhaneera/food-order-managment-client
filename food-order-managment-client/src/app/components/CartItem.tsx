import React from 'react';
import Image from 'next/image';
import img from '../../../public/breakfast.png';
import Button from './Button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const CartItem = ({ cartItems, subtotal,foodDataForBackend }:any) => {
  const mutation=useMutation({
    mutationKey:[],
    mutationFn:()=>placeOrder(foodDataForBackend),
    retry:1,
    retryDelay:5000,
    onSuccess: console.log("success")
      
    
  })
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
        <div className='mt-10'>
        <Button event={submit}/>
        </div>
      </div>
    </div>
  ):(
    <div className="w-full h-full flex justify-center items-center">
      <h1 className="font-sans text-3xl font-semibold">No items in cart</h1>
    </div>
  );
  
function submit(){
  debugger
  console.log(foodDataForBackend)
  mutation.mutate();
}
};
export default CartItem;

function placeOrder(data:any){
  try{
  axios.post(process.env.NEXT_PUBLIC_BASE_URL+'/api/orders/create',data);
  }catch(ex){
    console.log(ex);
    throw ex;
  }
}
