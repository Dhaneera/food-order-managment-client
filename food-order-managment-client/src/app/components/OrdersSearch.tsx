import { useState } from 'react';
import Button from './Button';

export default function OrdersSearch() {
  const [orderData, setOrderData] = useState({
    totalOrders: 250,
    completedOrders: 150,
    pendingOrders: 100,
  });

  const [searchOrder, setSearchOrder] = useState('');

  const handleSearch = () => {
    console.log(`Searching for order: ${searchOrder}`);
  };

  const handleDiscard = () => {
    setSearchOrder('');
    console.log('Search discarded');
  };

  return (
    <div className=" w-1/3  bg-white border rounded-lg p-8 shadow-xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Orders Search</h3>
      
      <div className="space-y-4 border-b pb-6">
        <div className="flex justify-between items-center text-gray-700">
          <span className="text-lg font-medium">Total Orders:</span>
          <span className="text-xl font-bold">{orderData.totalOrders}</span>
        </div>
        <div className="flex justify-between items-center text-gray-700">
          <span className="text-lg font-medium">Completed Orders:</span>
          <span className="text-xl font-bold">{orderData.completedOrders}</span>
        </div>
        <div className="flex justify-between items-center text-gray-700">
          <span className="text-lg font-medium">Pending Orders:</span>
          <span className="text-xl font-bold">{orderData.pendingOrders}</span>
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
          onChange={(e) => setSearchOrder(e.target.value)}
          className="w-full ring ring-black  rounded-lg p-3 shadow-sm focus:ring focus:ring-green-200 focus:border-green-500"
        />
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleDiscard}
          className="w-full bg-red-400 text-white text-bg-red-400  font-medium py-3 rounded-lg shadow-md hover:bg-red-600 transition-all"
        >
          Discard
        </button>
        <button
          onClick={handleSearch}
          className="w-full bg-green-500 text-white font-medium py-3 rounded-lg shadow-md hover:bg-green-700 transition-all"
        >
          Search Order
        </button>
      </div>
    </div>
  );
}