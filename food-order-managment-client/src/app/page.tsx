'use client';
import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import CartItem from './components/CartItem';
import Button from './components/Button';
import UserHeader from './components/UserHeader';
import Modal from './components/Modal';
import Order from './components/Order';
import Modall from './components/Modall';;
import SideBarStudent from './components/SideBarStudent';
import SideBar from './components/SideBar';
import { Item } from '@radix-ui/react-accordion';
import { useRouter } from 'next/navigation';


const Page = () => {

  const [tomorrow, setTomorrow] = useState({ date: 0, month: '' });
  const [dayAfterTomorrow, setDayAfterTomorrow] = useState({ date: 0, month: '' });
  const [selected, setSelected] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalComplete, setIsModalComplete] = useState(false);
  const [mealIds, setMealIds] = useState<any[]>([]);
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(true)
  const isSignIn = useRef("Sign In");
  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

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
    setVisible(true)
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.name === name ? { ...item, quantity: quantity, price: item.price } : item
      )
    );
  };

  const router = useRouter();


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

    // Ensures sessionStorage is accessed only on the client-side
    if (typeof window !== 'undefined') {
      const role = sessionStorage.getItem('role')
      const name = sessionStorage.getItem('name') || '';
      setRole(role || '');
      setName(name || '');
      if (name != '') {
        isSignIn.current = "Sign Out"
      }

    }


  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("name") == "Guest") {
      setImageVisible(false)
    }
  }, [])

   useEffect(()=>{
    if (sessionStorage.getItem("status")== "PENDING") {
        router.push("/accessError")
    }
   })



  function handleChangeSelectTomorrow() {
    setSelected(true);
  }

  function handleChangeSelectDayAfterTomorrow() {
    setSelected(false);
  }

  let foodDataForBackend: any = {
    id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    name: 'normal Order',
    role: role,
    status: 'Pending',
    price: subtotal,
    createdBy: name,
    createdAt: new Date().toISOString(),
    orderedAt: selected
      ? new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
      : new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    meals: {
      breakfast: {
        id: 1,
        count: cartItems[0].quantity,
        orderId: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        status: 'Pending',
        type: 'breakfast',
      },
      lunch: {
        id: 2,
        count: cartItems[1].quantity,
        orderId: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        status: 'Pending',
        type: 'lunch',
      },
      dinner: {
        id: 3,
        count: cartItems[2].quantity,
        orderId: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        status: 'Pending',
        type: 'dinner',
      },
    },
  };




  return isModalComplete ? (

    <Modall setIsModalComplete={setIsModalComplete}
      message={Array.isArray(mealIds) ? mealIds.map((obj) => obj) : []}
    />
  ) : (
    <>
      <div className="md:flex  h-screen ml-[-6%] max-md:ml-2 max-md:mr-7">
        <div className=' max-md:flex flex-col md:hidden items-center w-full ml-5  '>
          <Header modalView={setModalVisible} />
          <div className=' flex mt-[-30%] mr-[-70%]'>
            {imageVisible && <UserHeader onSettingsClick={handleOpenModal} sign={isSignIn.current} />}
          </div>
          <Modal
            title="User Settings"
            isVisible={isModalVisible}
            onClose={handleCloseModal}
            onDiscard={() => setModalVisible(false)}
            onSubmit={() => setModalVisible(false)}
          />
        </div>
        {role != 'ROLE_STAFF' ? <div className=' ml-[5.8%]'><SideBarStudent /></div> : <div className='ml-[5.8%]'><SideBar /></div>}
        <div className="w-full ml-10 mt-10 flex  max-lg:flex-col">
          <div className="lg:w-[52%] max-lg:align-middle w-full  ">
            <h1 className="font-sans font-bold text-4xl  mb-10">Place Order</h1>
            <div className="mt-5 gap-5 flex-col flex w-full">
              <div className="gap-5 flex max-md:gap-6 max-md:mb-10">
                <button
                  className={`${selected
                    ? 'rounded-lg lg:w-[20%] w-[46%] bg-[#faeee6] px-5 py-3 border-2 border-black max-md:w-[40%]'
                    : 'rounded-lg lg:w-[20%] w-[46%] bg-[#faeee6] px-5 py-3  max-md:w-[35%]'
                    }`}
                  onClick={handleChangeSelectTomorrow}
                >
                  {`${tomorrow.date} ${tomorrow.month}`}
                </button>
                <button
                  className={`${!selected
                    ? 'rounded-lg lg:w-[20%] w-[46%] bg-[#faeee6] px-5 py-3 border-2 border-black  max-md:w-[40%]'
                    : 'rounded-lg lg:w-[20%] w-[46%] bg-[#faeee6] px-5 py-3  max-md:w-[40%]'
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
          <div className="md:w-[51%] px-[5%] mt-5 max-lg:hidden">
            <h1 className="font-sans font-bold text-3xl pb-5">Cart</h1>
            <div className="w-full h-[85%] shadow-2xl rounded-md ">
              <CartItem foodDataForBackend={foodDataForBackend} setIsModalComplete={setIsModalComplete} cartItems={cartItems} setMealIds={setMealIds} subtotal={subtotal} />
            </div>
          </div>
          {visible && <div className='lg:hidden w-full  justify-center items-center ml-[-8.5%]  '>
            <div className="flex justify-around">
              <h3 className="font-sans font-thin">Subtotal</h3>
              <h2 className="font-poppins font-medium">{subtotal?.toFixed(2)}</h2>
            </div>
            <div className="flex justify-around pt-4 pb-5">
              <h3 className="font-sans font-thin">Grand Total</h3>
              <h2 className="font-poppins font-bold">{subtotal?.toFixed(2)}</h2>
            </div>
            <Button data={cartItems} />
          </div>}
        </div>
      </div>
    </>
  );
};

export default Page;