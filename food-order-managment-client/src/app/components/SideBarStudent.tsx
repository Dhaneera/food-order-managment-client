"use client"
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { DollarSign, UserCog, Home, Package, PowerOff } from 'lucide-react';
import { Tooltip } from "@nextui-org/tooltip";
import UserHeader from './UserHeader';
import { Power } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { set } from 'date-fns';

const SideBarStudent = () => {
   
    const [name, setName] = useState("");
    const [content, setContent] = useState('Log In');
    const [username,setUserName] = useState('')


    const role = sessionStorage.getItem('role')
    sessionStorage.getItem("name")||'';
    


    const isSignIn = useRef("Sign In");
    interface UserHeaderProps {
        onSettingsClick: () => void;
        sign: string
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedName = sessionStorage.getItem("name");

            if (!storedName || storedName.trim() === "") {  
                sessionStorage.setItem("name", "Guest");
                setName("Guest");
            } else {
                setName(storedName);
                setContent("Log Out");
            }
        }
    }, []);

    const route = useRouter();


    function hanldeClick() {
        sessionStorage.clear();
        route.push('/login');
    }

    return username == "Guest" || role == null ?(
        <>
            <div className='max-md:hidden h-screen  flex flex-col justify-center items-center gap-5 bg-white motion-preset-slide-right motion-duration-800'>
                <Tooltip content='Order' placement='right'>
                    <Link href='/'><Home size={80} className='px-4 className' strokeWidth={1} /></Link>
                </Tooltip>
                <Tooltip content={content} placement='right' className='px-3 className '>
                    {name == null ? <Power onClick={() => hanldeClick()} size={40} strokeWidth={1.2} /> : <PowerOff onClick={() => hanldeClick()} size={40} strokeWidth={1.2} />}
                </Tooltip>
            </div>
        </>
    ):(
        <>
            <div className='max-md:hidden h-screen  flex flex-col justify-center items-center gap-5 bg-white motion-preset-slide-right motion-duration-800'>
                <Tooltip content='Order' placement='right'>
                    <Link href='/'><Home size={80} className='px-4 className' strokeWidth={1} /></Link>
                </Tooltip>
                <Tooltip content='View Orders' placement='right'>
                    <Link href='/orders'><Package size={80} className='px-4 className' strokeWidth={1} /></Link>
                </Tooltip>
                <Tooltip content='View Payments' placement='right'>
                    <Link href='/payment'><DollarSign size={80} className='px-4 className' strokeWidth={1} /></Link>
                </Tooltip>
                <UserHeader onSettingsClick={function (): void {
                    throw new Error('Function not implemented.');
                }} sign={''} />
                <Tooltip content={content} placement='right' className='px-3 className '>
                    {name == null || "Guest" ? <Power onClick={() => hanldeClick()} size={40} strokeWidth={1.2} /> : <PowerOff onClick={() => hanldeClick()} size={40} strokeWidth={1.2} />}
                </Tooltip>
            </div>
        </>
    )
};

export default SideBarStudent;


