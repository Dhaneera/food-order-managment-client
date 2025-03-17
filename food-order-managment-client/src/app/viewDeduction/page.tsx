'use client'
import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { format } from "date-fns"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Loader from '../components/Loader'
import { PDFViewer, Document, Page, Text, View } from '@react-pdf/renderer'
import Report from '../components/Report'


const page = () => {
    const [date, setDate] = React.useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [phoneNumber, setPhoneNumber] = useState();
    const [orderInfo, setOrderInfo]: any = useState([]);
    const [meal, setMeal] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allInfo, setAllInfo] = useState([]);
    const [showReport, setShowReport] = useState(false);
    const breakfast = Number(process.env.NEXT_PUBLIC_BREKFAST_PRICE)
    const lunch = Number(process.env.NEXT_PUBLIC_LUNCH_PRICE)
    const dinner = Number(process.env.NEXT_PUBLIC_DINNER_PRICE)

    function handleChange(e: any) {
        setPhoneNumber(prev => e.target.value)
    }

    const mutation = useMutation({
        mutationKey: [phoneNumber, date, endDate],
        mutationFn: () => getOrdersOfEmployee(),
        retry: 1,
        retryDelay: 5000,
        onSuccess: (data: any) => {
            setLoading(false);
            setOrderInfo(data.data)
            setAllInfo(data.data)
        }
    })

    const mutationForMeal = useMutation({
        mutationKey: [meal],
        mutationFn: async (orderId: string): Promise<any> => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/meal/get/order/${orderId}`)
            return res.data;
        },
        onSuccess: (data: any) => {
            setMeal(data);
        },
        retry: 1,
        retryDelay: 5000
    })
    console.log(meal)

    const mutationFullReport = useMutation({
        mutationKey: [],
        mutationFn: () => getOrdersOfEmployeeForFullReport(),
        retry: 1,
        retryDelay: 5000,
        onSuccess: (data: any) => {
            setAllInfo(data.data);
            setLoading(false);
            setShowReport(true);
        },
        onError:()=>{
            setLoading(false);
            setShowReport(true);
        }
    })

    async function getOrdersOfEmployee() {
        setLoading(true);
        try {
            if (date && endDate) {
                const stDate = date.toLocaleDateString("en-CA")
                const enDate = endDate.toLocaleDateString("en-CA")
                const res = axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/get-all-for-period/${phoneNumber}/${stDate}/${enDate}`)
                return (await res).data;
            }
        } catch (error) {
            throw new Error("error");
        }
    }

    function handleClick(e: any) {
        mutation.mutate()

    }
    function loadMealInfo(orderId: string) {
        mutationForMeal.mutate(orderId);
    }
    console.log(date);

    async function getOrdersOfEmployeeForFullReport() {
        setLoading(true);
        try {
            if (date && endDate) {
                const stDate = date.toLocaleDateString("en-CA")
                const enDate = endDate.toLocaleDateString("en-CA")
                const res = axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/get-all-for-period/${stDate}/${enDate}`)
                return (await res).data;
            }
        } catch (error) {
            throw new Error("error");
        }
    }

    function handleReport(event: any): void {
        showFullReport(event);
    }
    function showFullReport(event: any): void {
        debugger
        mutationFullReport.mutateAsync();
    }
    function handleSingleReport(){
        mutation.mutateAsync();
        setShowReport(true);
    }

    return loading ? (
        <Loader />
    ) : (
        <div className='w-screen h-screen flex'>
            <SideBar />
            <div className='w-full h-full flex justify-center items-center'>
                <div className='w-[30%] pr-[2%] flex flex-col'>
                    <Label htmlFor='phoneNumber' className='pb-1'> Employee Phone Number</Label>
                    <Input name={"phoneNumber"} onChange={handleChange} type='text'></Input>
                    <Label className='mt-5 pb-1'>Start Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>

                            <Button
                                variant={"outline"}
                                className={cn(
                                    "py-3 justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Label className='mt-5 pb-1'>End Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>

                            <Button
                                variant={"outline"}
                                className={cn(
                                    "py-3 justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon />
                                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Button className='mt-16' onClick={handleClick}>Search for Deductions</Button>
                    <Button className='mt-3' onClick={handleReport}>Download Deduction Report</Button>
                    <Button className='mt-3 max-lg:py-8' onClick={handleSingleReport}>Download Single Employee<br className='lg:hidden'/> Deduction Report</Button>
                </div>
                <div className='w-[60%]'>
                    <div className='bg-white w-full shadow-lg rounded-lg'>
                        <h3 className='p-5 font-semibold font-sans text-2xl'>Employee Deduction</h3>
                        <div className='w-[100%] px-5'>
                            <Accordion type="single" collapsible className="w-full">
                                {
                                    orderInfo?.map((obj: any, index: any) => {
                                        return (
                                            <AccordionItem value={`item${index}`}>
                                                <AccordionTrigger onClick={() => loadMealInfo(obj.orders_id)}>
                                                    <div className='w-full flex justify-between px-2'>
                                                        <p>Date : {obj.created_at && obj.created_at.split('T')[0]}</p>
                                                        <p> Order : {obj.orders_id}</p>
                                                        <p className='text-green-600'> Total : LKR {obj.price}</p>
                                                    </div>
                                                </AccordionTrigger>
                                                {meal.map((mObj: any, index: any) => {
                                                    return (
                                                        <AccordionContent key={index}>
                                                            <div className='w-full h-full my-5 flex justify-around'>
                                                                <p>Meal ID : {mObj.id}</p>
                                                                <p>Type : {mObj.type}</p>
                                                                <p>Price : {mObj.type == 'breakfast' ? breakfast * mObj.count : mObj.type == 'lunch' ? lunch * mObj.count : dinner * mObj.count}</p>
                                                                <p>Count : {mObj.count}</p>
                                                            </div>
                                                        </AccordionContent>
                                                    )
                                                })}
                                            </AccordionItem>
                                        )
                                    })
                                }
                            </Accordion>
                        </div>
                        {showReport && (
                            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                                <div className='bg-white p-5 rounded-lg shadow-lg w-[80%] h-[80%] flex flex-col'>
                                    <h2 className='text-xl font-bold mb-4'>Employee Deduction Report</h2>
                                    <PDFViewer width="100%" height="90%">
                                        <Document>
                                            <Page size="A4">
                                                <Report data={allInfo}/>
                                            </Page>
                                        </Document>

                                    </PDFViewer>
                                    <button className='mt-4 p-2 bg-black text-white rounded' onClick={() => setShowReport(false)}>Close</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
