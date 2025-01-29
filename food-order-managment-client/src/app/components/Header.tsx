'use client';
import React, { useState, useEffect } from 'react';
import { DollarSign, Link, List, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Header = () => {
    const [isMouseIn, setIsMouseIn] = useState({ isIn: false, type: '' });
    const [isMobile, setIsMobile] = useState(false);
    const route=useRouter();

    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.matchMedia('(max-width: 1024px)').matches); 
        };

        handleResize(); 
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

   
    function handleInteraction(e: React.MouseEvent<HTMLDivElement>, bool: boolean) {
        setIsMouseIn({
            isIn: bool,
            type: e.currentTarget.id,
        });
    }

    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
       if(e.currentTarget.id=='order'){
            route.push('/orders')
       }else if(e.currentTarget.id=='payments'){
        route.push('payment')
       }else{
        route.push('/settings')
       }
    }

    return (
        <div className="w-full flex justify-center p-3">
            <div className="w-96 flex justify-center items-center gap-5 p-5 rounded-[32px] motion-preset-focus motion-duration-2000 border-gray-500 border-2 h-20">
               
                {isMouseIn.isIn && isMouseIn.type === 'order' ? (
                    <div
                        className="bg-[#e6f6e9] rounded-full w-[60%] motion-preset-slide-right h-14 justify-center items-center flex"
                        id="order"
                        onClick={isMobile ? (e) => handleInteraction(e, !isMouseIn.isIn) : (e)=>handleClick(e)}
                        onMouseEnter={!isMobile ? (e) => handleInteraction(e, true) : undefined}
                        onMouseLeave={!isMobile ? (e) => handleInteraction(e, false) : undefined}
                    >
                        <List size={20} strokeWidth={1} />
                        <p className="px-2">Orders</p>
                    </div> 
                ) : (
                    <div
                        className="bg-[#e6f6e9] rounded-full w-14 h-14 justify-center items-center flex"
                        id="order"
                        onClick={isMobile ? (e) => handleInteraction(e, true) : (e)=>handleClick(e)}
                        onMouseEnter={!isMobile ? (e) => handleInteraction(e, true) : undefined}
                        onMouseLeave={!isMobile ? (e) => handleInteraction(e, false) : undefined}
                    >
                        <List size={20} strokeWidth={1} />
                    </div>
                )}

                
                {isMouseIn.isIn && isMouseIn.type === 'payments' ? (
                    <div
                        className="bg-[#e6f6e9] rounded-full w-[60%] motion-preset-slide-right h-14 justify-center items-center flex"
                        id="payments"
                        onClick={isMobile ? (e) => handleInteraction(e, !isMouseIn.isIn) : (e)=>handleClick(e)}
                        onMouseEnter={!isMobile ? (e) => handleInteraction(e, true) : undefined}
                        onMouseLeave={!isMobile ? (e) => handleInteraction(e, false) : undefined}
                    >
                        <DollarSign size={20} strokeWidth={1} />
                        <p className="px-2">Payments</p>
                    </div>
                ) : (
                    <div
                        className="bg-[#e6f6e9] rounded-full w-14 h-14 justify-center items-center flex"
                        id="payments"
                        onClick={isMobile ? (e) => handleInteraction(e, true) : (e)=>handleClick(e)}
                        onMouseEnter={!isMobile ? (e) => handleInteraction(e, true) : undefined}
                        onMouseLeave={!isMobile ? (e) => handleInteraction(e, false) : undefined}
                    >
                        <DollarSign size={20} strokeWidth={1} />
                    </div>
                )}

                {/* Settings */}
                {isMouseIn.isIn && isMouseIn.type === 'settings' ? (
                    <div
                        className="bg-[#e6f6e9] rounded-full w-[60%] motion-preset-slide-right h-14 justify-center items-center flex"
                        id="settings"
                        onClick={isMobile ? (e) => handleInteraction(e, !isMouseIn.isIn) : (e)=>handleClick(e)}
                        onMouseEnter={!isMobile ? (e) => handleInteraction(e, true) : undefined}
                        onMouseLeave={!isMobile ? (e) => handleInteraction(e, false) : undefined}
                    >
                        <Settings size={20} strokeWidth={1} />
                        <p className="px-2">Settings</p>
                    </div>
                ) : (
                    <div
                        className="bg-[#e6f6e9] rounded-full w-14 h-14 justify-center items-center flex"
                        id="settings"
                        onClick={isMobile ? (e) => handleInteraction(e, true) : (e)=>handleClick(e)}
                        onMouseEnter={!isMobile ? (e) => handleInteraction(e, true) : undefined}
                        onMouseLeave={!isMobile ? (e) => handleInteraction(e, false) : undefined}
                    >
                        <Settings size={20} strokeWidth={1} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
