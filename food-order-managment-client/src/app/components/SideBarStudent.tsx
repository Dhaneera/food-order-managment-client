
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { DollarSign, UserCog, Hand, Home, Package, Users, PowerOff } from 'lucide-react';
import { Tooltip } from "@nextui-org/tooltip";
import Modal from './Modal';
import UserHeader from './UserHeader';
import { Power } from 'lucide-react';
import { set } from 'date-fns';

const SideBarStudent = () => {
        const [isModalVisible, setModalVisible] = useState(false);
        const handleOpenModal = () => setModalVisible(true);
        const handleCloseModal = () => setModalVisible(false);
          const [name, setName] = useState("");
          const [content,setContent]=useState('Log In');
        
    
        const isSignIn = useRef("Sign In");
        interface UserHeaderProps {
            onSettingsClick: () => void;
            sign: string
        }

        useEffect(() => {
            if (typeof window !== "undefined") {
                const storedName = sessionStorage.getItem("name");
                if (storedName) {
                    setName(storedName);
                    setContent('Log Out')

                }
            }
        }, []);


    return (
        <>
            <div className=' h-screen  flex flex-col justify-center items-center gap-5 bg-white motion-preset-slide-right motion-duration-800'>
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
                <UserHeader onSettingsClick={handleOpenModal} sign={isSignIn.current} />
                <Tooltip content={content} placement='right' className='px-3 className '>
                {name == null?<PowerOff size={40} strokeWidth={1.2} />:<Power size={40} strokeWidth={1.2} />}
                </Tooltip>
            </div>
        </>
    );
};

export default SideBarStudent;

