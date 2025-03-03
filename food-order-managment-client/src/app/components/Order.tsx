import React from 'react';
import FoodCard from './FoodCard';
import { set } from 'date-fns';

const Order = ({
  cartItems,
  updateCartItemQuantity,
 
}: {
  cartItems: any[];
  updateCartItemQuantity: (name: string, quantity: number) => void;

}) => {
 
  return (
    <div className="w-full">
      <h2 className="font-sans text-lg font-medium">
        Username <span className="font-sans text-lg font-light">- Dashan Nadeema</span>
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