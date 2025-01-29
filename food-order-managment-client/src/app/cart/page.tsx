'use client';
import React, { useState, useEffect, Suspense } from 'react';
import CartItem from '../components/CartItem';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);

  // Only run the useSearchParams hook on the client-side
  useEffect(() => {
    setSearchParams(useSearchParams());
  }, []);

  useEffect(() => {
    if (!searchParams) return; // Avoid running logic until searchParams is set

    const items = searchParams.getAll('name');
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
  }, [searchParams]);

  console.log('Cart Items:', cartItems);
  console.log('Subtotal:', subtotal);

  // Wrap the UI with Suspense to handle the loading state
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='w-screen h-screen flex flex-col justify-center items-center'>
        <CartItem cartItems={cartItems} subtotal={subtotal} />
      </div>
    </Suspense>
  );
};

export default Page;