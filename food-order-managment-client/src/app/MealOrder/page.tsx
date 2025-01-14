"use client"
import Sidebar from '../components/SideBar';
import OrdersSearch from '../components/OrdersSearch';
import IssueMeal from '../components/IssueMeal';

const MealOrder = () => {

  const mealData = {
    mealId: 12456,
    name: 'Sehan Dhaneera',
    contact: '+94 077 xxx xxxx',
    image: 'https://via.placeholder.com/150',
    quantity: 2,
  };

  return (

    <div className='flex h-screen '>
    <Sidebar/>
        <div className=' w-screen mt-56 flex  h-1/2 justify-center '>
        <OrdersSearch />
        <IssueMeal mealData={mealData} />
      </div>
    </div>

  );
}
export default MealOrder;


