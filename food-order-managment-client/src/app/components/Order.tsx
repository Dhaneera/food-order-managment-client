import React from 'react'
import Image from 'next/image'
import FoodCard from './FoodCard'


const Order = () => {
  return (
    <div className='w-full'>
      <h2 className='font-sans text-lg font-medium'>Username <span className='font-sans text-lg font-light'>- Dashan Nadeema</span></h2>
      <div className='w-full flex-col flex gap-4 pt-8'>
        <FoodCard/>
        <FoodCard/>
        <FoodCard/>
      </div>
    </div>
  )
}

export default Order