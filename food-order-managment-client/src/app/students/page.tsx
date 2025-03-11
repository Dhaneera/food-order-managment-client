"use client"
import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import TableHeader from '../table/TableHeader'
import tableInterface from '../table/TableInteface'
import { Edit, Search, Trash2 } from 'lucide-react';
import TableRow from '../table/TableRow'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios, { Axios } from 'axios'
import ConfirmationModal from '../components/ConfirmationModal'
import SideBar from '../components/SideBar'
import Loader from '../components/Loader'
import { AlertDialog } from '@radix-ui/react-alert-dialog'
import { AlertDescription } from '@/components/ui/alert'
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { debug } from 'console'
import { useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import Image from 'next/image';
import { Label } from '@/components/ui/label'
import statue from '@/../public/login-2.png';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'


const tableHeader: tableInterface[] = [
    {
        width: '25%',
        text: "name",
        style: ""
    }, {
        width: '25%',
        text: "Phone Number",
        style: ""
    }, {
        width: '25%',
        text: "role",
        style: ""
    }, {
        width: '25%',
        text: "Status",
        style: ""
    }, {
        width: '25%',
        text: "Actions",
        style: ""
    }
]


const Students = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isAllApprovedusers, setIsAllApprovedUsers] = useState(false);
    const [data, setData] = useState(-1);
    const [showModal, SetShowModal] = useState(false)
    const [userProfile, setUserProfile] = useState(false);
    let [mobileNumber, setMobileNumber] = useState("")

    let tableRows: any = []


    const [students, setStudents]: any = useState([]);
    let [ref, setRef] = useState(-1);


    tableRows = students.map((obj: any, index: number) => {

        return {
            style: '',
            cellData: [
                {
                    isButton: '',
                    text: obj.name,
                    style: '',
                    click: (e: any) => profileShow(e, obj.username)

                },
                {
                    isButton: '',
                    text: obj.username,
                    style: '',
                    click: (e: any) => profileShow(e, obj.username)

                },
                {
                    isButton: '',
                    text: obj.roles[0].name,
                    style: ''
                },
                {
                    isButton: [obj.status == "ACTIVE" ? 'Complete' : obj.status == "PENDING" ? 'Pending' : 'Rejected'],
                    clickEvent: (e: any) => changeStatusOfPirivenStudents(e, obj.id),
                    text: obj.status,
                    style: ''
                },
                {
                    isButton: 'icon',
                    text: <Trash2 width={60} onClick={() => deleteModalActivate(obj.id)} />,
                    style: 'flex flex-row gap-4'
                }

            ]


        }
    })
    const updateRef = useRef(0)
    const [visible, setVisible] = useState(false)
    const statusChangeMutation = useMutation({
        mutationKey: [students],
        mutationFn: () => changeStatus(updateRef.current),
        onSuccess: () => window.location.reload()
    })

    function changeStatus(index: any): any {
        axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/status/change/${index}`)

    }
    function changeStatusOfPirivenStudents(e: any, index: number) {
        updateRef.current = index
        setVisible(true);


    }

    const deleteMutation = useMutation({
        mutationFn: deleteFromDatabase(ref),
        mutationKey: [students],
        onSuccess: () => {
            window.location.reload();
        }

    })

    if (deleteMutation.isPending) {
        <Loader></Loader>
    }

    function deleteFuction(index: number) {
        setRef(index);
        if (ref != -1) {
            deleteMutation.mutate();
            students.pop();
        }
        SetShowModal(false)
        router.refresh();
    }
    function deleteModalActivate(obj: any) {
        setData(obj)
        SetShowModal(true);
    }
    const { isPending } = useQuery({
        queryKey: ['allStudents', currentPage],
        queryFn: async () => await fetchDataForAllStudents(currentPage - 1)
    })


    const getMutaion = useMutation({
        mutationKey: [],
        mutationFn: (userId) => getStudentById(userId),
        retry: 1,
        retryDelay: 5000
    })

    function profileShow(e: any, userId: any) {
        setUserProfile(true)
        getMutaion.mutate(userId);
    }

   async function getStudentById(mobileNumber:any) {

        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getByUsername?username=${mobileNumber}`);
            return res.data;
        }
        catch (error) {
            throw error;
        }

    }

    async function fetchDataForAllStudents(pageNum: any) {
        try {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getAll/students?page=${pageNum}&size=10`)
                .then((res: any) => {
                    setStudents(res?.data?.content)
                    setTotalPages(res?.data?.totalPages)
                    return res
                })

        } catch (error) {
            console.log(error)
            return []
        }



    }
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const studentMutaion = useMutation(
        {
            mutationKey: [students],
            mutationFn: () => getStudentWithStatus(currentPage - 1)
        }
    )

    function getStudentsforAppoval(): any {
        setIsAllApprovedUsers((prev) => !prev)
        studentMutaion.mutate();
    }

    function getStudentWithStatus(page: number): any {
        if (isAllApprovedusers) {
            let object = {
                type: "piriven",
                status: "PENDING"
            }
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/type?page=${page}`, object).then((res: any) => {
                setStudents(res?.data?.content)
                setTotalPages(res?.data?.totalPages)
                return res
            });
        } else {
            fetchDataForAllStudents(0);
        }
    }
    const serachStudentMutaion = useMutation({
        mutationKey: ['searchStudent'],
        mutationFn: () => fetchDataForSearchedStudents(currentPage - 1, sarch)
    })

    function fetchDataForSearchedStudents(page: number, userName: any): any {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/serach?username=${userName}&pageable=${page}`)
            .then((res) => {
                setStudents(res?.data?.content)
                return res
            }).catch((err) => {
                setStudents([])
                return err
            })
    }
    function getStudentsList(): any {
        serachStudentMutaion.mutate();
    }
    const [sarch, setSearch]: any = useState('');
    function search(e: any): any {
        setSearch(e.target.value);
    }

    if (isPending) {
        return <Loader />
    }

    function deleteFromDatabase(indexforDelete: number): any {
        if (indexforDelete !== -1) {
            axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/delete/${indexforDelete}`).then((res: any) => {
            })
        }
    }


    return getMutaion.isPending ? (
        <Loader />) : (
        <>
            {visible ? <ConfirmationModal clickEvent={statusChangeMutation.mutate} setVisible={setVisible} /> : <></>}
            <div className="w-screen flex flex-col">
                {userProfile == true ? <Sheet open={userProfile} onOpenChange={() => setUserProfile(prev => !prev)} >
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>View profile</SheetTitle>
                            <SheetDescription className='pt-5'>
                                Description of the employee selected from table below
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid  gap-6  ">
                            <Image
                                src={statue}
                                alt="Statue"
                                className=" ml-24 mt-5  size-40  rounded-2xl"
                            />
                            <div className="grid grid-cols-2 font-sans ">
                                <Label htmlFor="name" className=" text-pretty text-base">
                                    Student ID / Number
                                </Label>
                                <h2 id='name' className='col-span-3 text-gray-700 font-thin'>{students[0].studentMoreInfo.studentId}</h2>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className=" text-pretty text-base">
                                    Name
                                </Label>
                                <h2 id='name' className='col-span-4 text-gray-700 font-thin'>{students[0].name}</h2>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className=" text-pretty text-base">
                                    Gender
                                </Label>
                                <h2 id='name' className='col-span-4 text-gray-700 font-thin'>{students[0].studentMoreInfo.gender}</h2>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className=" text-pretty text-base">
                                    Stream
                                </Label>
                                <h2 id='name' className='col-span-4 text-gray-700 font-thin'>{students[0].studentMoreInfo.stream}</h2>

                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className=" text-pretty text-base">
                                    Status
                                </Label>
                                <h2 id='name' className='col-span-4 text-gray-700 font-thin'>{students[0].status}</h2>

                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className="  text-pretty text-base">
                                    Faculty
                                </Label>
                                <h2 id='name' className='col-span-4 text-gray-700 font-thin'>{students[0].studentMoreInfo.faculty || 'N/A'}</h2>

                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className="   text-pretty text-base">
                                    Batch
                                </Label>
                                <h2 id='name' className='col-span-4 text-gray-700 font-thin'>{students[0].studentMoreInfo.batch}</h2>
                            </div>
                        </div>
                        <SheetFooter>
                        </SheetFooter>
                    </SheetContent>
                </Sheet> : <></>}
                <div className='flex'>
                    <SideBar />
                    <div className="w-full flex flex-col items-center justify-center">
                        {showModal ? <AlertDialog open={showModal}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure about deleting this user ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete this account
                                        and remove data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => SetShowModal(false)}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteFuction(data)}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog> : <></>}
                        <div className="p-6 w-[85%] bg-white   rounded-xl shadow-md  ">
                            <h3 className="font-sans text-3xl font-semibold px-3 py-4 mb-10 ">View Students</h3>

                            <div className='flex items-end gap-5 mb-10'>
                                <Button className=' px-8 py-4  font-sans font-semibold ' onClick={() => getStudentsforAppoval()}>{isAllApprovedusers ? 'Approve Students' : 'All Students'}</Button>

                                <div className='flex  flex-auto justify-end'>
                                    <div className='  mr-5 '>
                                        <Input
                                            type="text"
                                            name="search"
                                            placeholder="Search For Contact ..."
                                            onChange={(e) => search(e)} />

                                    </div>
                                    <Button className='  px-4 font-sans font-semibold  ' onClick={() => getStudentsList()}> Search Student</Button>
                                </div>

                            </div>

                            <table className='w-full border-collapse'>
                                <TableHeader header={tableHeader} />

                                {tableRows.map((row: any, index: number) => {
                                    return (
                                        <TableRow key={index} cellData={row.cellData} styles={row.style}></TableRow>
                                    )
                                })}

                            </table>
                        </div>
                        <div className="flex justify-center mt-4 space-x-4">
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 bg-gray-200 rounded-l-3xl ${currentPage === 1 && "opacity-50 cursor-not-allowed  rounded-l-3xl"}`}
                            >
                                Previous
                            </button>
                            <span className=" mt-2">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 bg-gray-200 rounded-r-3xl ${currentPage === totalPages && "opacity-50 cursor-not-allowed rounded-r-3xl"}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div></>
    )
}
export default Students




