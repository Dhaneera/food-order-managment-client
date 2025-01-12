'use client';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Order from './components/Order';
import CartItem from './components/CartItem';
import img from '../../public/breakfast.png'
import Image from 'next/image';
import Button from './components/Button';

const Page = () => {
  const [tomorrow, setTomorrow] = useState({ date: 0, month: '' });
  const [dayAfterTomorrow, setDayAfterTomorrow] = useState({ date: 0, month: '' });
  const [selected, setSelected] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const [cartItems, setCartItems] = useState([
    { name: 'Breakfast', price: 280.0, quantity: 0 },
    { name: 'Lunch', price: 320.0, quantity: 0 },
    { name: 'Dinner', price: 400.0, quantity: 0 },
  ]);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const updateCartItemQuantity = (name: string, quantity: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.name === name ? { ...item, quantity: quantity, price: item.price } : item
      )
    );
  };

  useEffect(() => {
    const today = new Date();

    const tomorrowDate = new Date(today);
    tomorrowDate.setDate(today.getDate() + 1);
    const tomorrowMonth = tomorrowDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();

    const dayAfterTomorrowDate = new Date(today);
    dayAfterTomorrowDate.setDate(today.getDate() + 2);
    const dayAfterTomorrowMonth = dayAfterTomorrowDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();

    setTomorrow({
      date: tomorrowDate.getDate(),
      month: tomorrowMonth,
    });

    setDayAfterTomorrow({
      date: dayAfterTomorrowDate.getDate(),
      month: dayAfterTomorrowMonth,
    });
  }, []);

  function handleChangeSelectTomorrow() {
    setSelected(true);
  }

  function handleChangeSelectDayAfterTomorrow() {
    setSelected(false);
  }

  return (
    <div className="w-full flex flex-col ml-6 h-screen max-lg:w-[95%]">
      <div className='flex items-center  ml-24  max-lg:ml-0'>
      <Header  />
      <div className="relative mr-36 max-lg:hidden">
      <button
        id="avatarButton"
        type="button"
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full cursor-pointer"
      >
        <Image
          src={img}
          alt="User dropdown"
          className="w-10 h-10 rounded-full"
        />
      </button>

      {isDropdownOpen && (
        <div
          id="userDropdown"
          className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <div className="px-4 py-3 text-sm  ">
            <div>Bonnie Green</div>
            <div className="font-medium truncate">name@flowbite.com</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 "
            aria-labelledby="avatarButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Settings
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
    </div>
      <div className="w-full flex h-full max-lg:flex-col">
        <div className="lg:w-[52%] max-lg:align-middle w-full mt-5 h-full">
          <h1 className="font-sans font-bold text-3xl">Place Order</h1>
          <div className="mt-5 gap-5 flex-col flex w-full">
            <div className="gap-5 flex">
              <button
                className={`${
                  selected
                    ? 'rounded-lg lg:w-[20%] w-[46%] bg-[#faeee6] px-5 py-3 border-2 border-black'
                    : 'rounded-lg lg:w-[20%] w-[46%] bg-[#faeee6] px-5 py-3'
                }`}
                onClick={handleChangeSelectTomorrow}
              >
                {`${tomorrow.date} ${tomorrow.month}`}
              </button>
              <button
                className={`${
                  !selected
                    ? 'rounded-lg lg:w-[20%] w-[46%] bg-[#faeee6] px-5 py-3 border-2 border-black'
                    : 'rounded-lg lg:w-[20%] w-[46%] bg-[#faeee6] px-5 py-3'
                }`}
                onClick={handleChangeSelectDayAfterTomorrow}
              >
                {`${dayAfterTomorrow.date} ${dayAfterTomorrow.month}`}
              </button>
            </div>
            <div className="mb-12">
              <Order cartItems={cartItems} updateCartItemQuantity={updateCartItemQuantity} />
            </div>
          </div>
        </div>
        <div className="w-[51%] px-[5%] mt-5 max-lg:hidden">
          <h1 className="font-sans font-bold text-3xl pb-5">Cart</h1>
          <div className="w-full h-[85%] shadow-2xl rounded-md">
            <CartItem cartItems={cartItems} subtotal={subtotal} />
          </div>
        </div>
        <div className='lg:hidden w-full flex justify-center items-center mt-[-70%]'>
        <Button/>
        </div>
      </div>
    </div>
  );
};

export default Page;