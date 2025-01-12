'use client'
import React,{useState,useEffect} from 'react'
import CartItem from '../components/CartItem'
import router from 'next/router';
import { useSearchParams } from 'next/navigation';

const page = () => {
    const data = useSearchParams();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [subtotal, setSubtotal] = useState<number>(0);

    useEffect(() => {
        const items = data.getAll('name');
        let cartData: any[] = [];
        let total = 0;
    
        items.forEach((item) => {
          const parsedItem = JSON.parse(decodeURIComponent(item));
          if (parsedItem) {
            cartData.push(parsedItem);
            total += parsedItem.price * parsedItem.quantity; 
          }
        });
    
        setCartItems(cartData);
        setSubtotal(total);
      }, [data]);
    
  
  return (
    <CartItem cartItems={cartItems} subtotal={subtotal} />
  )
}

export default page
