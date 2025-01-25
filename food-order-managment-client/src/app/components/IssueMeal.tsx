import { useEffect, useState } from 'react';

export default function IssueMeal({ mealData, ...props }:any) {
  const [issued, setIssued] = useState(false);
  const [isintial,setIsIntial] = useState(true);

  const handleIssueOrder = () => {
    setIssued(true);
    console.log(`Order for Meal ID: ${mealData.mealId} has been issued.`);
  };


  if(props.error!=''){
    return(
      <>
      </>
    )
  }
  console.log(mealData.name.substring(0,2));


  return props.order == null && props.order == undefined ? (
    <div className=" w-1/3 ml-12 bg-white border flex justify-center items-center rounded-lg shadow-xl p-6 text-center">
      <h3 className='font-bold font-sans text-2xl'>Search for a meal in order to show here</h3>
    </div>    
  ):(
    <div className=" w-1/3 ml-12 bg-white border rounded-lg shadow-xl p-6 text-center">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Issue Meal</h3>
      
      <div className="text-left mb-6">
        <p className="text-lg text-gray-600">
          <span className="font-medium text-gray-800">Meal ID:</span> #{mealData.mealId}
        </p>
      </div>
      <div className="flex flex-col items-center gap-2 mb-6">
        <img
          src={mealData.image}
          alt="Profile"
          className="w-24 h-24 rounded-full border shadow-sm"
        />
        <p className="text-lg font-medium text-gray-800">{mealData.name}</p>
        <p className="text-gray-500">{mealData.contact}</p>
      </div>

      <div className="flex justify-between items-center text-lg font-medium text-gray-600 mb-6">
        <span>{mealData.mealId.substring(0,2)=='BR'?`Breakfast`:mealData.mealId.substring(0,2)=='LN'?`Lunch`:`Dinner`}</span>
        <span>{mealData.quantity}</span>
      </div>

      <button
        onClick={handleIssueOrder}
        disabled={issued}
        className={`w-full py-3 rounded-lg text-lg font-medium ${
          issued
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-green-100 text-green-600 hover:bg-green-200'
        } transition-all`}
      >
        {issued ? 'Order Issued' : 'Issue Order'}
      </button>
    </div>
  );
}