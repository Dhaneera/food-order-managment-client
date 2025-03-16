'use client'
import React, { useEffect, useState } from 'react'
import tableInterface from '../table/TableInteface'
import TableHeader from '../table/TableHeader'
import TableRow from '../table/TableRow'
import ordersAxios, { Order } from '../payment/orders'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, LucideAArrowDown } from 'lucide-react'
import Header from '../components/Header'
import MobileCard from '../table/MobileCard'
import { orderMobile } from '../orders/order'
import SideBar from '../components/SideBar'
import Loader from '../components/Loader'
import { Button } from '@/components/ui/button'

const Page = () => {
    const rowCountPerPage = 10;
    let name: string = '';
    const [page, setPage] = useState(1);
    const tableRows: any = [];
    const router = useRouter();
    const { isError, isLoading, isFetched, data, isSuccess, isStale, isFetching } = useQuery({
        queryFn: () => ordersAxios(page, rowCountPerPage, name),
        queryKey: ['orders', 'payments', page, name],
        retry: 3,
        retryDelay: 3000,
        staleTime:120000,
        retryOnMount: true,
        refetchOnReconnect: true,

    })

    useEffect(() => {
        name = sessionStorage.getItem('name') || '';
    }, [])
    const ordersMobileMock: orderMobile[] = [];

    data?.content.map((obj, index):any => {
        ordersMobileMock.push({
            id: obj.id,
            price: obj.price,
            orderRecDate: obj.orderedAt,
            status: obj.status
        })
    })

    const tableHeader: tableInterface[] = [
        {
            width: '25%',
            text: "Order ID",
            style: "",
        }, {
            width: '25%',
            text: "Price",
            style: ""
        },
        {
            width: '25%',
            text: "Created By",
            style: ""
        },
        {
            width: '25%',
            text: "Order Rec.Date",
            style: ""
        }, {
            width: '25%',
            text: "Status",
            style: ""
        }
    ]
    data?.content.map((obj:any, index) => {
        let status = obj.status;
        tableRows.push({
            style: "", cellData: [{
                isButton: 'Complete',
                text: obj.id,
                style: ''
            },
            {
                isButton: '',
                text: String(obj.price),
                style: 'py-8'
            }
                ,
            {
                isButton: '',
                text: obj.createdBy,
                style: ''
            }
                , {
                isButton: '',
                text: obj.orderedAt,
                style: ''
            },
            {
                isButton: status,
                text: obj.status,
                style: ''
            }]
        })
    })

    function navigateToPlaceOrder() {
        router.push('/')

    }

    return isLoading ? (
        <Loader />
    ) : (

        <>
            <div className=' flex items-center'>
                <div className=' flex'>
                    <SideBar />
                </div>
                <div className='w-full flex justify-center max-md:hidden'>
                    <div className="p-6 w-[85%] max-lg:w-[95%] bg-white h-full rounded-lg shadow-md ">
                        <div className='flex justify-between px-2 py-4 mb-10'>
                            <h3 className='font-sans text-4xl font-semibold'>View All Orders</h3>
                            <Button className='font-sans font-semibold' onClick={navigateToPlaceOrder}>Place Order</Button>
                        </div>
                        {data?.content.length == 0 ?
                            <div className='w-full h-96 flex justify-center items-center'><p className='text-center text-2xl font-bold'>No Orders To Show</p></div> :
                            <table className="w-full border-collapse">
                                <TableHeader header={tableHeader}></TableHeader>
                                <tbody>
                                    {tableRows.map((row: any, index: any): any => {
                                        return (
                                            <TableRow key={index} cellData={row.cellData} styles={row.style} />
                                        )
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
                {/* mobile view */}
                {/* <div className='md:hidden w-screen h-screen px-3 flex flex-col'>
                <h3 className='text-3xl font-poppins font-semibold my-3'>My Orders</h3>
                <div className='w-full h-full  flex flex-col gap-1'>
                    {ordersMobileMock.map((ord,index)=>{
                        return(
                            <MobileCard key={index} order={ord}/>
                        )
                    })}
                    <div className='w-full justify-center pb-6 flex gap-3 items-center'>
                     <ArrowLeft strokeWidth={1} size={30} className='hover:text-green-700'  onClick={() => page != 1 ? setPage((prev) => prev - 1) : setPage(prev => prev)}/>
                     <p>{page}</p>
                     <ArrowRight strokeWidth={1} size={30} className='hover:text-green-700'  onClick={() => page != data?.totalPages ? setPage((prev) => prev + 1) : setPage(prev => prev)}/>
                     </div>
                </div>
               
            </div>*/}

            </div>
            <div className='w-full flex gap-5 py-5 justify-center items-center max-lg:hidden mt-[-10%]'>
                <button className=' bg-[#78b3a8] text-white px-4 py-2 rounded-md' onClick={() => page != 1 ? setPage((prev) => prev - 1) : setPage(prev => prev)}>Previous</button>
                <p>{page}</p>
                <button className='bg-[#78b3a8] text-white px-6 py-2 rounded-md' onClick={() => page != data?.totalPages ? setPage((prev) => prev + 1) : setPage(prev => prev)}>Next</button>
            </div>
        </>
    )
}

export default Page