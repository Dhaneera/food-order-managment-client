import React from 'react'
import Image from 'next/image'
import { Minus, Plus } from 'lucide-react'
import image from '../../../public/breakfast.png'

const FoodCard = () => {
  return (
    <div className='w-[95%] h-[20%] flex py-4 shadow-lg rounded-lg'>
    <div className='w-[30%]'>
    <Image src={image} alt='' className=' scale-125 py-2 px-4'/>
    </div>
    <div className='items-center flex w-[70%] justify-around gap-5 px-3 py-3'>
      <h3 className='font-sans font-medium'>Breakfast</h3>
      <div className='flex items-center gap-5'>
      <div className='rounded-full flex justify-center items-center h-10 w-10 bg-[#e6f6e9]'>
          <Plus strokeWidth={1.25}/>
      </div>
      <div>
        <p className='font-sans font-semibold'>10</p>
      </div>
      <div className='rounded-full flex justify-center items-center h-10 w-10 bg-[#e6f6e9]'>
          <Minus strokeWidth={1.25}/>
      </div>
      <h5>Rs 200.00</h5>

      </div>
    </div>
  </div>
)
}

export default FoodCard