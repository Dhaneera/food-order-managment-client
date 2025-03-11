"use client"
import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';


const Order = ({
  cartItems,
  updateCartItemQuantity,
 
}: {
  cartItems: any[];
  updateCartItemQuantity: (name: string, quantity: number) => void;

}) => {

  const [userData, setUserData] = useState<{name?:string,status?:string}>({});

  useEffect(() => {
    const name = sessionStorage.getItem("name") || "";
    const status = sessionStorage.getItem("status") || "";
    
    setUserData({name,status} );
  }, []);
  
  

  return (
    <div className="w-full">
      <h2 className="font-sans text-lg font-medium flex flex-col">
         <span className="font-sans text-lg font-light"> Username - {userData.name}</span>
         {userData.status && <span className="font-sans text-lg font-light">  Status - {userData.status}</span>}
      </h2>
      <div className="w-full flex-col flex gap-4 pt-8">
        {cartItems.map((item: any) => (
          <FoodCard
            key={item.name}
            name={item.name}
            price={item.price}
            onUpdateQuantity={(quantity) => updateCartItemQuantity(item.name, quantity)}
          />
        ))}
      </div>
    </div>
  );
};

export default Order;