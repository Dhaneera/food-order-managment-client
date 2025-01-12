import React from 'react';

const MobileCard = ({ order }: any) => {
  return (
    <div className="bg-white w-full pb-3 border-2 rounded-xl flex mb-4">
      <div className="flex-col w-[70%] gap-3 px-3">
        <h3 className="py-4 font-semibold">Order ID: {order.id}</h3>
        <div className="flex justify-between gap-4">
          <h6 className="font-light text-gray-700">Price: {order.price}</h6>
        </div>
        <div className="flex justify-between gap-4">
          <h6 className="font-light text-gray-700">
            Order Rec Date: {order.orderRecDate}
          </h6>
        </div>
      </div>
      <div className="w-[30%] flex justify-center items-center">
        <button
          className={`px-4 py-1 mr-2 rounded-lg ${
            order.status === 'Pending'
              ? 'bg-[#FAE6D7] text-[#FF9A00]'
              : order.status === 'Complete'
              ? 'bg-[#E6F6E9] text-[#2CC56F]'
              : 'bg-[#f8c6c6] text-red-500'
          }`}
        >
          {order.status}
        </button>
      </div>
    </div>
  );
};

export default MobileCard;
