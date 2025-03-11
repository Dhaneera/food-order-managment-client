'use client';
import React, { useState, useEffect } from 'react';
import { DollarSign, Home, Link, List, Settings,User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import { truncateSync } from 'fs';

const Header = (props:any) => {
    const [isMouseIn, setIsMouseIn] = useState({ isIn: false, type: '' });
    const [isMobile, setIsMobile] = useState(false);
    const[visible, setVisible] = useState(false)

    const route=useRouter();

    // const role = sessionStorage.getItem('role')
    // sessionStorage.getItem("name")||'';

    //     useEffect(() => {
    //         if (typeof window !== "undefined") {
    //              ;
    //             if (sessionStorage.getItem("name")== undefined ||sessionStorage.getItem("name")=="") {  
    //                 setName("Guest");
    //             }
    //         }
    //     }, []);



//    sessionStorage.name = name
  



    useEffect(()=>{
         if(sessionStorage.getItem("name") == "Guest"){
        setVisible(true)
    }
    },[])

   

    
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
       if(e.currentTarget.id=='home'){
            route.push('/')
       }else if(e.currentTarget.id=='settings'){
            route.push('/login')
       }else if(e.currentTarget.id=='order'){
            route.push('/orders')
       }
       else if(e.currentTarget.id=='payments'){
        route.push('/payment')
       }else{
            props.modalView(true)
       }
    }

    return visible ?(
        <div className="w-full flex justify-center p-5 m   ">
            <div className=" justify-end ml-[100%]   items-end   motion-preset-focus motion-duration-2000 mb-10">
                
                {/* Settings */}
                {isMouseIn.isIn && isMouseIn.type === 'settings' ? (
                    <div
                        className="bg-[#e6f6e9] rounded-full w-[60%] motion-preset-slide-right h-14 justify-center items-center flex"
                        id="settings"
                        onClick={isMobile ? (e) => handleInteraction(e, !isMouseIn.isIn) : (e)=>handleClick(e)}
                        onMouseEnter={!isMobile ? (e) => handleInteraction(e, true) : undefined}
                        onMouseLeave={!isMobile ? (e) => handleInteraction(e, false) : undefined}
                    >
                        <User size={40} strokeWidth={1} />
                        <p className="px-5">Login</p>
                    </div>
                ) : (
                    <div
                        className="bg-[#e6f6e9] mr-16 rounded-full w-14 h-14 justify-center items-center flex"
                        id="settings"
                        onClick={isMobile ? (e) => handleInteraction(e, true) : (e)=>handleClick(e)}
                        onMouseEnter={!isMobile ? (e) => handleInteraction(e, true) : undefined}
                        onMouseLeave={!isMobile ? (e) => handleInteraction(e, false) : undefined}
                    >
                        <User size={20} strokeWidth={1} />
                    </div>
                )}
            </div>
        </div>
    ):(
        <div className="w-full flex justify-center p-3 ">
            <div className="w-96 flex justify-center items-center  gap-3 rounded-[32px] motion-preset-focus motion-duration-2000 border-gray-500 border-2 h-20">
               
                {isMouseIn.isIn && isMouseIn.type === 'home' ? (
                    <div
                        className="bg-[#e6f6e9]  rounded-full w-[60%] motion-preset-slide-right h-14 justify-center items-center flex"
                        id="home"
                        onClick={isMobile ? (e) => handleInteraction(e, !isMouseIn.isIn) : (e)=>handleClick(e)}
                        onMouseEnter={!isMobile ? (e) => handleInteraction(e, true) : undefined}
                        onMouseLeave={!isMobile ? (e) => handleInteraction(e, false) : undefined}
                    >
                        <Home size={20} strokeWidth={1} />
                        <p className="px-2  ">Home</p>
                    </div> 
                ) : (
                    <div
                        className="bg-[#e6f6e9]  rounded-full w-14 h-14 justify-center items-center flex"
                        id="home"
                        onClick={isMobile ? (e) => handleInteraction(e, true) : (e)=>handleClick(e)}
                        onMouseEnter={!isMobile ? (e) => handleInteraction(e, true) : undefined}
                        onMouseLeave={!isMobile ? (e) => handleInteraction(e, false) : undefined}
                    >
                        <Home size={20} strokeWidth={1} />
                    </div>
                )}

                
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
                        onClick={isMobile ? (e) => handleInteraction(e, true) : (e)=>handleClick(e)
                         }
                        onMouseEnter={!isMobile ? (e) => handleInteraction(e, true) : undefined}
                        onMouseLeave={!isMobile ? (e) => handleInteraction(e, false) : undefined}
                    >
                        <List size={20} strokeWidth={1} />
                    </div>
                )}

                {/* Settings */}
                {isMouseIn.isIn && isMouseIn.type === 'payments' ? (
                    <div
                        className="bg-[#e6f6e9] rounded-full w-[60%] motion-preset-slide-right h-14 justify-center items-center flex"
                        id="payments"
                        onClick={isMobile ? (e) => handleInteraction(e, !isMouseIn.isIn) : (e)=>handleClick(e)}
                        onMouseEnter={!isMobile ? (e) => handleInteraction(e, true) : undefined}
                        onMouseLeave={!isMobile ? (e) => handleInteraction(e, false) : undefined}
                    >
                        <DollarSign size={20} strokeWidth={1} />
                        <p className="px-2">payments</p>
                    </div>
                ) : (
                    <div
                        className="bg-[#e6f6e9] mr-16 rounded-full w-14 h-14 justify-center items-center flex"
                        id="payments"
                        onClick={isMobile ? (e) => handleInteraction(e, true) : (e)=>handleClick(e)}
                        onMouseEnter={!isMobile ? (e) => handleInteraction(e, true) : undefined}
                        onMouseLeave={!isMobile ? (e) => handleInteraction(e, false) : undefined}
                    >
                        <DollarSign size={20} strokeWidth={1} />
                    </div>
                )}
            </div>
        </div>
    );
    
};

export default Header;
