import { useState } from 'react';
import Button from './Button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal';
import { sendError } from 'next/dist/server/api-utils';

export default function OrdersSearch(props:any) {

  const [orderData, setOrderData] = useState({
    completedOrders: 0,

  });

  const [searchOrder, setSearchOrder] = useState('');
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationKey: ['ordersSearch', searchOrder],
    mutationFn: async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/meal/${searchOrder}`);
      const responseReturn=response.data;
      return{
        ...responseReturn,
        search:searchOrder
      }
    },
    onSuccess: (data:any) => {
      props.setOrderData(data);
    },
    onError: (error:any) => {
      props.setError(error.response.data);
    },
  })
  

  const handleSearch = (e:any) => {
    e.preventDefault();
    setSearchOrder(e.target.value);
    mutation.mutateAsync();

    if(searchOrder.indexOf(' ')>=0){
      setError('Order ID cannot contain spaces');
    } else if(searchOrder.length<1){
      setError('Order ID cannot be empty');
    }
  };


  const hanldeChange = (e:any) => {
    setSearchOrder(e.target.value);
    if(error) setError('');
  }
  
  const handleDiscard = () => {
    setSearchOrder('');
    setError('');
  };
  

  return props.error==''?(
    <div className=" w-1/3  bg-white border rounded-lg p-8 shadow-xl  max-lg:w-1/2 max-lg:ml-5">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Orders Search</h3>
      
      <div className="space-y-4 border-b pb-6">
        <div className="flex justify-between items-center text-gray-700">
          <span className="text-lg font-medium">Total Meals:</span>
          <span className="text-xl font-bold">{props.totalOrders}</span>
        </div>
        <div className="flex justify-between items-center text-gray-700">
          <span className="text-lg font-medium">Pending Meals:</span>
          <span className="text-xl font-bold">{props.completedOrders}</span>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="search" className="block text-gray-600 text-lg font-medium mb-2 ">
          Enter Order
        </label>
        <input
          
          id="search"
          type="text"
          placeholder="Enter Order"
          value={searchOrder}
          onChange={(e) => hanldeChange(e)}
          disabled={!props.Session} 
          className="w-full ring ring-black  rounded-lg p-3 shadow-sm focus:ring focus:ring-green-200 focus:border-green-500"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleDiscard}
          className="w-full bg-red-400 text-white text-bg-red-400  font-medium py-3 rounded-lg shadow-md hover:bg-red-600 transition-all"
        >
          Discard
        </button>
        <button
          onClick={(e)=>handleSearch(e)}
          className="w-full bg-green-500 text-white font-medium py-3 rounded-lg shadow-md hover:bg-green-700 transition-all"
          disabled={!props.Session}
        >
          Search Order
        </button>
      </div>
    </div>
  ):(
    <>
    </>
  );
}