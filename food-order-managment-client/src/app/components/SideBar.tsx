"use client"
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { DollarSign, UserCog, Hand, Home, Package, Users } from 'lucide-react';
import { Tooltip } from "@nextui-org/tooltip";
import UserHeader from './UserHeader';
import { Power } from 'lucide-react';
import { PowerOff } from 'lucide-react';
import { set } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import axios from 'axios';
const SideBar = () => {


    const [name, setName] = useState("");
    const [content, setContent] = useState('Log In');
    const [errors, setErrors] = useState("");



    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedName = sessionStorage.getItem("name");
            if (storedName) {
                setName(storedName);
                setContent('Log Out')
            }
        }
    }, []);


    const route = useRouter();


    function hanldeClick() {
        sessionStorage.clear();
        route.push('/login');
    }


    return (
        <>
            <div className='md:ml-[-0.5%] max-md:hidden h-screen  flex flex-col justify-center items-center gap-5 bg-white motion-preset-slide-right motion-duration-800'>
                <Tooltip content='Order Completion' showArrow={true} placement='right'>
                    <Link href='/MealOrder'><Home size={80} className='px-4 className' strokeWidth={1} /></Link>
                </Tooltip>
                <Tooltip content='User Managment' placement='right'>
                    <Link href='/viewAllEmployees'><Users size={80} className='px-4 className' strokeWidth={1} /></Link>
                </Tooltip>
                <Tooltip content='Student Managment' placement='right'>
                    <Link href='/students'><Hand size={80} className='px-4 className' strokeWidth={1} /></Link>
                </Tooltip>
                <Tooltip content='Order Managment' placement='right'>
                    <Link href='/viewAllOrders'><Package size={80} className='px-4 className' strokeWidth={1} /></Link>
                </Tooltip>
                <Tooltip content='View Payments' placement='right'>
                    <Link href='/viewAllPayments'><DollarSign size={80} className='px-4 className' strokeWidth={1} /></Link>
                </Tooltip>
                <Tooltip content='Employee Deductions' placement='right'>
                    <Link href='/viewDeduction'><UserCog size={80} className='px-4 className' strokeWidth={1} /></Link>
                </Tooltip>
                <UserHeader onSettingsClick={function (): void {
                    throw new Error('Function not implemented.');
                }} sign={''} />
                <Tooltip content={content} placement='right' className='px-3 className '>
                    {name == null ? <Power onClick={() => hanldeClick()} size={40} strokeWidth={1.2} /> : <PowerOff onClick={() => hanldeClick()} size={40} strokeWidth={1.2} />}
                </Tooltip>
            </div>
        </>
    );
};

export default SideBar;

