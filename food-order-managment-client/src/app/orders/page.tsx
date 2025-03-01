'use client'
import React, { useEffect, useState } from 'react'
import tableInterface from '../table/TableInteface'
import TableHeader from '../table/TableHeader'
import TableRow from '../table/TableRow'
import ordersAxios, { Order } from '../payment/orders'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, LucideAArrowDown } from 'lucide-react'
import Header from '../components/Header'
import MobileCard from '../table/MobileCard'
import { orderMobile } from './order'
import Loader from "../components/Loader";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import axios from 'axios'
import SideBarStudent from '../components/SideBarStudent'

const Page = () => {
    const rowCountPerPage = 10;
    let name: string = '';
    const [page, setPage] = useState(1);
    const [moreData, setMoreData] = useState({
        orderId: -1,
        allData: []
    });
    const router = useRouter();
    const { isError, isLoading, isFetched, data, isSuccess, isStale, isFetching } = useQuery({
        queryFn: () => ordersAxios(page, rowCountPerPage, name),
        queryKey: ['orders', 'payments', page, name],
        retry: 1,
        retryDelay: 3000,
        staleTime: Infinity,
        retryOnMount: false,
        refetchOnReconnect: false,

    })

    useEffect(() => {
        name = sessionStorage.getItem('name') || '';
    }, [])
    const ordersMobileMock: orderMobile[] = [];

    data?.content.map((obj, index) => {
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

    let tableRows: { style: string; cellData: { isButton: string; text: string; style: string }[] }[] = [];
    data?.content.map((obj, index) => {
        let status = obj.status;
        tableRows.push({
            style: "",

            cellData: [{
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

    const mutate = useMutation({
        mutationFn: (id: any) => getMealDataFromOrderId(id),
        mutationKey: [moreData],
        retry: 2,
        retryDelay: 5000,
    })

    function getMealData(orderId: number) {
        setMoreData((prev: any) => {
            return {
                ...prev,
                orderId
            }
        })
        mutate.mutateAsync(orderId);
    }
    async function getMealDataFromOrderId(orderId: number): Promise<any> {
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/meal/get/order/${orderId}`)
            .then((res: any) => {
                setMoreData((prev: any) => {
                    return {
                        ...prev,
                        allData: res.data
                    }
                })
            })
    }
    return isLoading ? (
        <Loader />
    ) : (
        <div className='h-screen flex flex-col motion-preset-slide-right motion-duration-700'>
            <div className=' w-full flex py-3  px-3 '>
                <Sheet onOpenChange={() => setMoreData(() => {
                    return {
                        orderId: -1,
                        allData: []
                    }
                })} open={moreData.orderId != -1}>
                    <SheetContent side={"bottom"}>
                        <SheetHeader>
                            <SheetTitle>Order Data</SheetTitle>
                            <SheetDescription>
                                <div className='flex flex-col w-full'>
                                    <p>
                                        Checkout meal information reagrding the order you have placed.
                                    </p>
                                    <div className="my-5 w-full grid grid-cols-3 max-md:grid max-md:grid-cols-2 max-md:gap-5 max-md:text-base ">
                                        {["breakfast", "lunch", "dinner"].map((mealType) => {
                                            const mealData = moreData?.allData.filter((obj: any) => obj.type === mealType) || [];
                                            const totalCount = mealData.reduce((acc: number, obj: any) => acc + (obj.count || 0), 0);
                                            const orderId = mealData.map((obj: any) => obj.id || 0)
                                            const totalPrice = totalCount * Number(process.env.NEXT_PUBLIC_BREKFAST_PRICE || 0);

                                            return (
                                                <div key={mealType} className="flex flex-col">
                                                    <strong className="text-lg font-sans font-bold text-black max-md:text-sm">
                                                        {`${mealType.toUpperCase()} : ${totalCount != 0 ? orderId : `N/A`}`}
                                                    </strong>
                                                    <p className="font-semibold text-xl max-md:text-sm">count: {totalCount}</p>
                                                    <p className="font-semibold text-xl max-md:text-sm">price: {totalPrice}</p>
                                                </div>
                                            );
                                        })}
                                    </div>

                                </div>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
            <div className=' flex' h-screen>
                <SideBarStudent />
                <div className='w-full flex justify-center max-md:hidden mb-40'>
                    <div className="p-6 w-[85%] max-lg:w-[95%] bg-white h-full rounded-lg shadow-md ">
                        <div className='flex justify-between px-2 py-4'>
                            <h3 className='font-sans text-3xl font-semibold px-3 py-2'>My Orders</h3>
                            <button className=' px-4 rounded-2xl bg-[#e6f6e9] font-sans font-semibold' onClick={navigateToPlaceOrder}>Place Order</button>
                        </div>
                        {data?.content.length == 0 ?
                            <div className='w-full h-96 flex justify-center items-center'><p className='text-center text-2xl font-bold'>No Orders To Show</p></div> :
                            <table className="w-full border-collapse">
                                <TableHeader header={tableHeader}></TableHeader>
                                <tbody>
                                    {tableRows.map((row: any, index: any): any => {
                                        return (
                                            <TableRow key={index} cellData={row.cellData} doubleClick={getMealData} styles={row.style} />
                                        )
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>

            {/* mobile view */}
            <div className='md:hidden w-screen h-screen px-3 flex flex-col'>
                <h3 className='text-3xl font-poppins font-semibold my-3'>My Orders</h3>
                <div className='w-full h-full  flex flex-col gap-1'>
                    {ordersMobileMock.map((ord, index) => {
                        return (
                            <MobileCard key={index} order={ord} />
                        )
                    })}
                    <div className='w-full justify-center pb-6 flex gap-3 items-center'>
                        <ArrowLeft strokeWidth={1} size={30} className='hover:text-green-700' onClick={() => page != 1 ? setPage((prev) => prev - 1) : setPage(prev => prev)} />
                        <p>{page}</p>
                        <ArrowRight strokeWidth={1} size={30} className='hover:text-green-700' onClick={() => page != data?.totalPages ? setPage((prev) => prev + 1) : setPage(prev => prev)} />
                    </div>
                </div>

            </div>
            <div className='w-full flex gap-5 py-5 mt-[-10%] justify-center items-center max-lg:hidden'>
                <button className=' bg-[#78b3a8] text-white px-4 py-2 rounded-md' onClick={() => page != 1 ? setPage((prev) => prev - 1) : setPage(prev => prev)}>Previous</button>
                <p>{page}</p>
                <button className='bg-[#78b3a8] text-white px-6 py-2 rounded-md' onClick={() => page != data?.totalPages ? setPage((prev) => prev + 1) : setPage(prev => prev)}>Next</button>
            </div>
        </div>
    )
}

export default Page


