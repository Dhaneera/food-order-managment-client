"use client"
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { DollarSign, UserCog, Hand, Home, Package, Users, PowerOff } from 'lucide-react';
import { Tooltip } from "@nextui-org/tooltip";
import Modal from './Modal';
import UserHeader from './UserHeader';
import { Power } from 'lucide-react';
import { set } from 'date-fns';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SideBarStudent = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const handleOpenModal = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);
    const [name, setName] = useState("");
    const [content, setContent] = useState('Log In');
    const [errors, setErrors] = useState("");


    const isSignIn = useRef("Sign In");
    interface UserHeaderProps {
        onSettingsClick: () => void;
        sign: string
    }


    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedName = sessionStorage.getItem("name");
            if (storedName && storedName !== name) {  // Avoid unnecessary re-renders
                setName(storedName);
                setContent("Log Out");
            }
        }
    }, []);

    const route = useRouter();

    const mutaion = useMutation({
        mutationFn: userLogout,
        mutationKey: ["userLogout"],
        onSuccess: () => {
            toast.success('User Logout successfully');
            route.push('/login');
        },
        onError: (error) => {
            toast.error('User registration failed');
            setErrors(error.message);
        },
    })

    async function userLogout() {
        try {
            sessionStorage.removeItem("name");
            const response = await axios.post('http://localhost:3000/api/auth/logout');
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    function hanldeClick() {
        mutaion.mutate();
    }

    function hanldeRoute() {
        route.push('/login');
    }

    return (
        <>
            <div className='md:ml-[5.8%] max-md:hidden h-screen  flex flex-col justify-center items-center gap-5 bg-white motion-preset-slide-right motion-duration-800'>
                <Tooltip content='Order' placement='right'>
                    <Link href='/'><Home size={80} className='px-4 className' strokeWidth={1} /></Link>
                </Tooltip>
                <Tooltip content='View Orders' placement='right'>
                    <Link href='/orders'><Package size={80} className='px-4 className' strokeWidth={1} /></Link>
                </Tooltip>
                <Tooltip content='View Payments' placement='right'>
                    <Link href='/payment'><DollarSign size={80} className='px-4 className' strokeWidth={1} /></Link>
                </Tooltip>
                <Tooltip content='userSettings' placement='right'>
                    <Link href='/'><UserCog size={80} className='px-4 className' strokeWidth={1} /></Link>
                </Tooltip>
                <UserHeader onSettingsClick={function (): void {
                    throw new Error('Function not implemented.');
                }} sign={''} />
                <Tooltip content={content} placement='right' className='px-3 className '>
                    {name == null ? <PowerOff onClick={() => hanldeClick()} size={40} strokeWidth={1.2} /> : <Power onClick={() => hanldeRoute()} size={40} strokeWidth={1.2} />}
                </Tooltip>
            </div>
        </>
    );
};

export default SideBarStudent;


