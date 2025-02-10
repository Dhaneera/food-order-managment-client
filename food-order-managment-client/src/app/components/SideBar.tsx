import React from 'react';
import Link from 'next/link';
import { DollarSign, UserCog, Hand, Home, Package, Users } from 'lucide-react';
import { Tooltip } from "@nextui-org/tooltip";

const SideBar = () => {
    return (
        <div className=' h-screen flex flex-col justify-center items-center gap-5 bg-white motion-preset-slide-right motion-duration-800'>
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
        </div>
    );
};

export default SideBar;

