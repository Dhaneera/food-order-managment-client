import React, { useRef, useState } from 'react';
import Image from 'next/image';
import img from '../../../public/breakfast.png';
import Button from './Button';
import { Button as Btn } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Loader from './Loader';
import PlaceOrderAlert from './PlaceOrderAlert';
import { set } from 'date-fns';
import { number } from 'zod';
import Modall from './Modall';

const CartItem = ({ cartItems, subtotal, foodDataForBackend, ...props }: any) => {
  const router = useRouter()
  const [state, setState] = useState(false);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [mealIds, setMealIds] = useState([]);
  const [visible, setVisible] = useState(false);
  const [ordeAlert,setOrderAlert] = useState(false);

  const mutation = useMutation({
    mutationKey: ['placeOrder'],
    mutationFn: (): any => placeOrder(foodDataForBackend),
    onSuccess: (data) => {
      setAlert(true);
      setTimeout(() => {
        window.location.reload();
      }, 6000);

    },

    retry: 1,
    retryDelay: 5000,
  })

 

  function placeOrder(data: any){
    debugger
     axios.post(process.env.NEXT_PUBLIC_BASE_URL+'/api/orders/create', data)
      .then((response) => {
        setMealIds(response.data);
        setOrderAlert(true)
        return response;
      })
      .catch((error) => {
        console.error("Order Error:", error);
        throw error;
      });
  }


  function handleLoginRedirect(event: any): void {
    router.push('/login')
  }
  const [userName, setUsername] = useState('')

  function handleUserData(event: any): void {
    setUsername(event.target.value)
  }


  function handleOnClick(e:any) {
    debugger
    e.preventDefault();
    setError(false);



    if (userName.length < 10) {
      console.log("Error: Username too short");
      setError(true);

    } else {

      foodDataForBackend.createdBy = userName;
      foodDataForBackend.role = "Guest"
    
      mutation.mutate();
      setState(false)
      
    }

  }
  
  return subtotal != 0 && state == false ? (
    <div className='flex'>
      {alert && <div className=' absolute mt-[-4%]   ml-[20%]  '><PlaceOrderAlert mealIds={mealIds} /></div>}
      <div className="w-full h-full px-3 flex gap-2 flex-col py-10 ">
        {mutation.isPending && <Loader />}
        {cartItems?.map((item: any, index: any): any => (
          item.quantity != 0 ? (
            <div
              key={index}
              className="w-full flex justify-between items-center bg-white  border-2 rounded-md px-2 py-1"
            >
              <Image src={img} alt={item.name} className="w-24 h-24" />
              <p>{item.name}</p>
              <h3 className="px-1 font-medium">{`${Number(item?.price * item.quantity)?.toFixed(2)}`}</h3>
            </div>) : (<div key={index}></div>)
        ))}
        <div className="w-full border-t-2 flex flex-col mt-6">
          <div className="flex justify-around pt-4">
            <h3 className="font-sans font-thin">Subtotal</h3>
            <h2 className="font-poppins font-medium">{subtotal?.toFixed(2)}</h2>
          </div>
          <div className="flex justify-around pt-4">
            <h3 className="font-sans font-thin">Grand Total</h3>
            <h2 className="font-poppins font-bold">{subtotal?.toFixed(2)}</h2>
          </div>
          <div className='md:mt-10'>
            {state ? <></> : <Button event={submit} />}
          </div>
        </div>
      </div>
    </div>

  ) : state == true ? (
    <>
      <Dialog open={state}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Place Order As A Guest</DialogTitle>
            <DialogDescription>
              Place order without login just fill the data and make the payment
              <span className='font-bold'> for the order of RS {subtotal}.00</span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Phone Number
              </Label>
              <Input onChange={(e) => handleUserData(e)} id="name" className="col-span-3" />
              {error && <Label className='w-full col-span-5 text-xs ml-20 pl-10 text-red-500 pt-[-8%]'>Please enter a valid phone Number</Label>}
            </div>
          </div>
          <DialogFooter>
            <Btn type="submit" onClick={handleLoginRedirect}>Login OR Register</Btn>
            <Btn type="submit" onClick={(e) => handleOnClick(e)}>Place Order</Btn>
          </DialogFooter>
        </DialogContent>
        
      </Dialog>
    </>
  ) : (
    <div className="w-full h-full flex justify-center items-center">
      <h1 className="font-sans text-3xl font-semibold">No items in cart</h1>
    </div>
  )

  function submit() {
    if (sessionStorage.getItem("userId")) {
      mutation.mutate();
    } else {
      setState(true);
      setVisible(true);
    }
  }
};
export default CartItem;