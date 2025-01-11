'use client'
import React, { useState } from 'react'
import tableInterface from '../table/TableInteface'
import TableHeader from '../table/TableHeader'
import TableRow from '../table/TableRow'
import ordersAxios from '../payment/orders'
import {  useQuery } from '@tanstack/react-query'
import {  useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'

const Page = () => {
    const rowCountPerPage = 10;
    const [page,setPage] = useState(1);
    const router = useRouter();
    const {isError,isLoading,isFetched,data,isSuccess,isStale,isFetching}=useQuery({
        queryFn:()=>ordersAxios(page,rowCountPerPage),
        queryKey:['orders','payments',page],
        retry:3,
        retryDelay:3000,
        retryOnMount:true,
        refetchOnReconnect:true, 
        
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

    let tableRows: { style: string; cellData: { isButton: string; text: string; style: string }[] }[] = [];
    data?.content.map((obj, index) => {
        let status= obj.status;
        tableRows.push({
            style: "", cellData: [{
                isButton: 'Complete',
                text: obj.id,
                style: ''
            },
            {
                isButton: '',
                text: String(obj.price),
                style: ''
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

    function navigateToPlaceOrder(){
        router.push('/')
        
    }

    return isLoading?(
        <Loader/>
    ):(
        <div className='h-screen flex flex-col'>
            <div className='border-b-2 w-full flex py-3 justify-between px-3'>
                <h3 className='font-sans text-3xl font-semibold px-3 py-2'>My Orders</h3>
                <button className=' px-4 rounded-2xl bg-[#e6f6e9] font-sans font-semibold'onClick={navigateToPlaceOrder}>Place Order</button>
            </div>
            <div className='w-full'>
                <div className="p-6 bg-white h-full rounded-lg shadow-md">
                    {data?.content.length==0?
                    <div className='w-full h-96 flex justify-center items-center'><p className='text-center text-2xl font-bold'>No Orders To Show</p></div>:
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
            <div className='w-full flex gap-5 py-5 justify-center items-center'>
            <button className=' bg-[#78b3a8] text-white px-4 py-2 rounded-md'onClick={()=>page!=1?setPage((prev)=>prev-1):setPage(prev=>prev)}>Previous</button>
            <p>{page}</p>
            <button className='bg-[#78b3a8] text-white px-6 py-2 rounded-md'onClick={()=>page!=data?.totalPages?setPage((prev)=>prev+1):setPage(prev=>prev)}>Next</button>                            
            </div>
        </div>
    )
}

export default Page