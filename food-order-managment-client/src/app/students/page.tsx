"use client"
import React, { useState } from 'react'
import Header from '../components/Header'
import TableHeader from '../table/TableHeader'
import tableInterface from '../table/TableInteface'
import { Trash2 } from 'lucide-react';
import TableRow from '../table/TableRow'


const tableHeader: tableInterface[] = [
    {
        width: '25%',
        text: "StudentID",
        style: ""
    }, {
        width: '25%',
        text: "Phone Number",
        style: ""
    }, {
        width: '25%',
        text: "Student Name",
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


const tableRows: tableInterface[] = [
    {
        style: "",
         cellData:[{
            isButton: 'Complete',
            text: 'jdojfo',
            style: ''
        },
        {
            isButton: '',
            text: '1299',
            style: 'py-8'
        }
            ,
        {
            isButton: '',
            text: '2323',
            style: ''
        }
            , {
            isButton: '',
            text: '121',
            style: ''
        },
        {
            isButton: 'icons',
            text: <Trash2 />,
            click: deleteItemFromArray,
            style: 'px-3'
        }]
    },
    // {
    //     id: 3,
    //     phoneNumber: 987654321,
    //     studentName: "Jane Smith",
    //     status: "Inactive",
    //     actions:<Trash2/>
    // },
    // {
    //     id: 3,
    //     phoneNumber: 987654321,
    //     studentName: "Jane Smith",
    //     status: "Inactive",
    //     actions:<Trash2/>
    // }
]
function deleteItemFromArray(){
    debugger
    console.log("deleteItemFromArray")
    tableHeader.pop();
}



const Students = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [data,setData] = useState([]);


    // const TableRow=data.map((obj:any)=>{
    //     style:"",
    //     cellData:[
    //         { isButton: "", text: obj.id, style: "" },
    //         { isButton: "", text: obj.name, style: "" },
    //         { isButton: "", text: `$${obj.price}`, style: "py-6" },
    //         { isButton: obj.status, text: obj.status, style: "px-3 py-2" },
    //     ]
    // })

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

    function navigateToRegisterStudents(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        // Assuming you want to navigate to a different page
        window.location.href = '/register';
    }
    function approveStudents(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        // Assuming you want to navigate to a different page
        window.location.href = '/approve';
    }

    return (
        <div className="w-screen h-screen flex flex-col max-lg:w-2/3">
            <div className="flex py-3 justify-between px-3">
                <Header />
            </div>
            <div className="w-full flex flex-col items-center">

                <div className="p-6 w-[85%] bg-white   rounded-xl shadow-md  ">
                    <h3 className="font-sans text-3xl font-semibold px-3 py-4 mb-24 ">View Students</h3>

                    <div className='flex items-end gap-5'>
                    <button className=' px-8 py-4 rounded-2xl bg-[#e6f6e9] font-sans font-semibold mb-10  ' onClick={navigateToRegisterStudents}>Register Students</button>
                    <button className=' px-8 py-4 rounded-2xl bg-[#e6e6f6] font-sans font-semibold mb-10  ' onClick={approveStudents}>Approve Students</button>
                    </div>
                    
                    <table className='w-full border-collapse'>
                        <TableHeader header={tableHeader} />
                        
                            {tableRows.map((row:any, index) => (
                                <TableRow key={index} cellData={row.cellData}/>
                            ))}
                      
                    </table>
                </div>
                <div className="flex justify-center mt-4 space-x-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 bg-gray-200 rounded-l-3xl ${currentPage === 1 && "opacity-50 cursor-not-allowed  rounded-l-3xl"
                            }`}
                    >
                        Previous
                    </button>
                    <span className=" mt-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 bg-gray-200 rounded-r-3xl ${currentPage === totalPages && "opacity-50 cursor-not-allowed rounded-r-3xl"
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Students