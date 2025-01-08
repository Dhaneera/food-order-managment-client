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
    <div className='w-full flex px-2'>
      <div className='lg:w-[52%] max-lg:align-middle  w-full mt-5'>
        <h1 className="font-sans font-bold text-3xl">Place Order</h1>
        <div className="mt-5 gap-5 flex-col flex w-full ">
          <div className='gap-5 flex'>
            <button className={`${selected ? 'rounded-lg lg:w-[20%] w-[46%] bg-[#faeee6] px-5 py-3 border-2 border-black' : 'rounded-lg lg:w-[20%] w-[46%] bg-[#faeee6] px-5 py-3'}`} onClick={handleChangeSelectTomorrow}>
              {`${tomorrow.date} ${tomorrow.month}`}
            </button>
            <button className={`${!selected ? 'rounded-lg lg:w-[20%] w-[46%] bg-[#faeee6] px-5 py-3 border-2 border-black' : 'rounded-lg lg:w-[20%] w-[46%] bg-[#faeee6] px-5 py-3'}`} onClick={handleChangeSelectDayAfterTomorrow}>
              {`${dayAfterTomorrow.date} ${dayAfterTomorrow.month}`}
            </button>
          </div>
          <div className='mb-12'>
            <Order />
          </div>
        </div>
      </div>
      {/* cart starts here */}
      <div className='w-[51%] px-[5%] mt-5 max-lg:hidden'>
      <h1 className="font-sans font-bold text-3xl pb-5">Cart</h1>
      <div className=' w-full h-[90%] shadow-2xl rounded-md'>

      </div>
      </div>
    </div>
  );
};

export default Page;
