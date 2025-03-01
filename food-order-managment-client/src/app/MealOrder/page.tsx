"use client";
import Sidebar from "../components/SideBar";
import OrdersSearch from "../components/OrdersSearch";
import IssueMeal from "../components/IssueMeal";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ConfirmationModal from "../components/ConfirmationModal";
import ErrorModal from "../components/ErrorModal";
import Loader from "../components/Loader";

// Helper function to format date to YYYY-MM-DD
const formatDate = (date:any) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};


const MealOrder = () => {
  const [order,setOrder]=useState(null);
  const [errorForModal,setErrorForModal] = useState('');
  const[completedOrders,setCompletedOrders] = useState(0);
  const [date, setDate] = useState(""); // Stores the formatted date string
  const [meal, setMeal] = useState(""); // Stores the meal type (Breakfast, Lunch, Dinner)
  const ref = useRef(""); // Stores the current time string



  const [totalOrders,setTotalOrders] =useState(0);
  // Environment variables for meal times
  const breakfastTimeStamp = parseInt(process.env.NEXT_PUBLIC_BREAKFAST_TIMESTAMP || "10", 10);
  const lunchTimeStamp = parseInt(process.env.NEXT_PUBLIC_LUNCH_TIMESTAMP || "14", 10);
  const dinnerTimeStamp = parseInt(process.env.NEXT_PUBLIC_DINNER_TIMESTAMP || "20", 10);

  // Mock data for meal issue
  const mealData = {
    mealId: 12456,
    name: "Sehan Dhaneera",
    contact: "+94 077 xxx xxxx",
    image: "https://via.placeholder.com/150",
    quantity: 2,
  };

  // Determine the current meal type based on the time
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours(); // Get the current hour (24-hour format)

    // Update the date and time
    setDate(formatDate(now));
    ref.current = now.toLocaleTimeString('en-UK');

    // Set meal type based on the time
    if (currentHour < breakfastTimeStamp) {
      setMeal("Breakfast");
    } else if (currentHour >= breakfastTimeStamp && currentHour < lunchTimeStamp) {
      setMeal("Lunch");
    } else {
      setMeal("Dinner");
    }
  }, [breakfastTimeStamp, lunchTimeStamp, dinnerTimeStamp]);


  // Fetch orders using React Query
  const { data, isLoading, error } = useQuery({
   queryKey: ["orders", date, meal], // Add both date and meal in the query key for better refetching
    queryFn:() => getOrderDetails(date, meal),
   } // Fetch the orders with dynamic date and meal
   // Ensure the query runs only when date and meal are set
  );

  if (isLoading) {
    return <Loader />;
  }

  
  async function getOrderDetails(date:any, meal:any) {
    try {


      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/count/${date}/${meal}`);

      
      setTotalOrders(response.data.total);
      setCompletedOrders(response.data.pending);
      
    } catch (error) {
      console.error("Error fetching order details:", error);
      throw error;
    }
    return null;
  }

  return errorForModal==''? 
   (
    <div className="flex h-screen">
      <Sidebar />
      <p className="absolute top-3 right-8 font-sans font-bold text-2xl">{date}</p>
      <p className="absolute top-12 right-8 font-sans font-semibold text-lg">
        Current Meal: {meal}
      </p>
      <div className="w-screen mt-56 flex h-1/2 justify-center">
        <OrdersSearch totalOrders={totalOrders} completedOrders={completedOrders} error={errorForModal} setError={setErrorForModal} setOrderData={setOrder}  />
        <IssueMeal error={errorForModal} order={order} mealData={order} />
      </div>
    </div>
  ):(
    <ErrorModal message={errorForModal} setVisible={setErrorForModal}/>
  )
};

export default MealOrder;