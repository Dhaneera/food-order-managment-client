import React from 'react'
import SideBar from '../components/SideBar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const page = () => {
  return (
    <div className='w-screen h-screen flex'>
        <SideBar/>
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='w-[30%] flex flex-col gap-2'>
                <Label>Employee Phone Number</Label>
            <Input type='text'></Input>
            </div>
            <div className='w-[30%] h-[70%] bg-white shadow-lg rounded-2xl p-6 max-w-lg text-center'>

            </div>
        </div>
    </div>
  )
}

export default page