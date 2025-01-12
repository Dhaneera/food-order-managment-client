'use client';
import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const data = useSearchParams();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);

  useEffect(() => {
    const items = data.getAll('name'); 
    const parsedItems: any[] = [];

    
    items.forEach((item) => {
      try {
        const decoded = decodeURIComponent(item); 
        const parsed = JSON.parse(decoded); 
        if (Array.isArray(parsed)) {
          parsedItems.push(...parsed); 
        } else {
          parsedItems.push(parsed); 
        }
      } catch (error) {
        console.error('Error parsing item:', error);
      }
    });

    
    setCartItems((prevCartItems) => {
      const updatedCart = [...prevCartItems];
      let newSubtotal = 0;

      parsedItems.forEach((newItem) => {
        const existingItemIndex = updatedCart.findIndex(
          (item) => item.name === newItem.name
        );

        if (existingItemIndex !== -1) {
          updatedCart[existingItemIndex].quantity += newItem.quantity;
        } else {
          updatedCart.push(newItem);
        }


        newSubtotal += newItem.price * newItem.quantity;
      });


      setSubtotal(newSubtotal);
      return updatedCart;
    });
  }, [data]);

  console.log('Cart Items:', cartItems);
  console.log('Subtotal:', subtotal);

  return <CartItem cartItems={cartItems} subtotal={subtotal} />;
};

export default Page;