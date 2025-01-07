'use client';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Order from './components/Order';

const Page = () => {
  const [tomorrow, setTomorrow] = useState({ date: 0, month: '' });
  const [dayAfterTomorrow, setDayAfterTomorrow] = useState({ date: 0, month: '' });
  const [selected, setSelected] = useState(true);

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
    <div className="w-screen h-screen lg:px-14 px-4">
      <Header />
      <div className='w-full lg:flex flex-col'>
        <div className='lg:w-[50%] w-full'>
          <h1 className="font-sans font-medium text-3xl">Place Order</h1>
          <div className="mt-5 gap-5 flex-col flex w-full ">
            <div className='gap-5 flex'>
              <button className={`${selected ? 'rounded-lg lg:w-[20%] w-[50%] bg-[#faeee6] px-5 py-3 border-2 border-black' : 'rounded-lg lg:w-[20%] w-[50%] bg-[#faeee6] px-5 py-3'}`} onClick={handleChangeSelectTomorrow}>
                {`${tomorrow.date} ${tomorrow.month}`}
              </button>
              <button className={`${!selected ? 'rounded-lg lg:w-[20%] w-[50%] bg-[#faeee6] px-5 py-3 border-2 border-black' : 'rounded-lg lg:w-[20%] w-[50%] bg-[#faeee6] px-5 py-3'}`} onClick={handleChangeSelectDayAfterTomorrow}>
                {`${dayAfterTomorrow.date} ${dayAfterTomorrow.month}`}
              </button>
            </div>
            <Order />
          </div>
        </div>
        {/* cart starts here */}
        <div>
          cart
        </div>
      </div>
    </div>
  );
};

export default Page;
