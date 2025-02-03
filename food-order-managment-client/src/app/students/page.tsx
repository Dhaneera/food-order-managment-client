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

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isAllApprovedusers, setIsAllApprovedUsers] = useState(false);
    const [data, setData] = useState([]);
    const [loading,isLoading]=useState(false)

    let tableRows: any = []


    const [students, setStudents] = useState([]);
    let [ref, setRef] = useState(-1);

    tableRows = students.map((obj: any, index: number) => {

        return {
            style: '',
            cellData: [
                {
                    isButton: '',
                    text: obj.name,
                    style: ''
                },
                {
                    isButton: '',
                    text: obj.username,
                    style: ''
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
                    text: <Trash2 width={60} onClick={() => deleteFuction(obj.id)} />,
                    style: 'flex flex-row gap-4'
                }

            ]

        }
    })
    const updateRef = useRef(0)
    const [visible,setVisible]=useState(false)
    const statusChangeMutation=useMutation({
        mutationKey: [students],
        mutationFn: () => changeStatus(updateRef.current),
        onSuccess:()=>window.location.reload()
    })

    function changeStatus(index: any): any {
        axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/status/change/${index}`)

    }
    function changeStatusOfPirivenStudents(e: any, index: number) {
        updateRef.current = index
        setVisible(true);


    }

    console.log('visible',visible)

    const deleteMutation = useMutation({
        mutationFn: deleteFromDatabase(ref),
        mutationKey: [students],

    })

    function deleteFuction(index: number) {
        setRef(index);
        if (ref != -1) {
            deleteMutation.mutate()
            students.pop();
        }
    }
    const {isPending}  = useQuery({
        queryKey: ['allStudents',currentPage],
        queryFn: () => fetchDataForAllStudents(currentPage - 1)
    })
    function fetchDataForAllStudents(pageNum: any) {
       

        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getAll/students?page=${pageNum}&size=10`)
            .then((res: any) => {
                setStudents(res?.data?.content)
                setTotalPages(res?.data?.totalPages)
                return res
            })
            .catch((ex: any) => {
                return ex;
            })

    }
    console.log(students)
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
                console.log(res);
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
        return <Loader/>
    }


    return  (
        <>
        {visible?<ConfirmationModal clickEvent={statusChangeMutation.mutate} setVisible={setVisible}/>:<></>}
        <div className="w-screen flex flex-col">
        <div className='flex'>
            <SideBar/>
    
            <div className="w-full flex flex-col items-center justify-center">

                <div className="p-6 w-[85%] bg-white   rounded-xl shadow-md  ">
                    <h3 className="font-sans text-3xl font-semibold px-3 py-4 mb-10 ">View Students</h3>

                    <div className='flex items-end gap-5'>
                        <button className=' px-8 py-4 rounded-2xl bg-[#e6f6e9] font-sans font-semibold mb-10  '>Register Students</button>
                        <button className=' px-8 py-4 rounded-2xl bg-[#e6e6f6] font-sans font-semibold mb-10  ' onClick={() => getStudentsforAppoval()}>{isAllApprovedusers ? 'Approve Students' : 'All Students'}</button>
                        
                        <div className='flex  flex-auto justify-end'>
                        <div className=' m-12  ring  ring-orange-300 hover:ring-orange-400  active:ring-orange-400     rounded border'>
                            <input
                                type="text"
                                name="search"
                                placeholder="Search..."
                                onChange={(e) => search(e)} />

                        </div>
                        <button className=' mt-10  px-4 rounded-2xl bg-[#e6e6f6] font-sans font-semibold mb-10  ' onClick={() => getStudentsList()}> Search Student</button>
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


function deleteFromDatabase(indexforDelete: number): any {
    if (indexforDelete !== -1) {
        axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/delete/${indexforDelete}`).then((res: any) => {
            console.log(res)
        })
    }
}

