"use client"
import React, { useState } from 'react';
import TableHeader from '../table/TableHeader';
import tableInterface from '../table/TableInteface';
import TableRow from '../table/TableRow';

const tableData = [
    {
        paymentId: "1234567890",
        orderId: "123456789",
        amount: "29.0",
        status: "Complete",
    },
    {
        paymentId: "1234567890",
        orderId: "123456789",
        amount: "29.0",
        status: "Complete",
    },
    {
        paymentId: "1234567890",
        orderId: "123456789",
        amount: "29.0",
        status: "Complete",
    },
    {
        paymentId: "1234567890",
        orderId: "123456789",
        amount: "29.0",
        status: "Complete",
    },
    {
        paymentId: "1234567890",
        orderId: "123456789",
        amount: "29.0",
        status: "Complete",
    },
    {
        paymentId: "1234567890",
        orderId: "123456789",
        amount: "29.0",
        status: "Complete",
    },
    {
        paymentId: "1234567890",
        orderId: "123456789",
        amount: "29.0",
        status: "Complete",
    },
    {
        paymentId: "1234567890",
        orderId: "123456789",
        amount: "29.0",
        status: "Complete",
    },
    {
        paymentId: "1234567890",
        orderId: "123456789",
        amount: "29.0",
        status: "Complete",
    },
    {
        paymentId: "1234567890",
        orderId: "123456789",
        amount: "29.0",
        status: "Complete",
    },
    {
        paymentId: "1234567890",
        orderId: "123456789",
        amount: "29.0",
        status: "Complete",
    },
    {
        paymentId: "1234567890",
        orderId: "123456789",
        amount: "29.0",
        status: "Complete",
    },
    {
        paymentId: "1234567890",
        orderId: "123456789",
        amount: "29.0",
        status: "Complete",
    },
    {
        paymentId: "1234567890",
        orderId: "123456789",
        amount: "29.0",
        status: "Complete",
    },

];

const tableHeader: tableInterface = [
    {
        width: '25%',
        text: "Payment ID",
        style: "",
    },
    {
        width: '25%',
        text: "Order ID",
        style: ""
    },
    {
        width: '25%',
        text: "Amount",
        style: ""
    },
    {
        width: '25%',
        text: "Status",
        style: ""
    },
];

const Page = () => {
    const rowsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1); 

    // Calculate total pages
    const totalPages = Math.ceil(tableData.length / rowsPerPage);

    // Get rows for the current page
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentData = tableData.slice(indexOfFirstRow, indexOfLastRow);

    // Generate table rows for the current page
    const tableRows: { style: string; cellData: { isButton: string; text: string; style: string }[] }[] = [];
    currentData.map((obj, index) => {
        let status = obj.status;
        tableRows.push({
            style: "",
            cellData: [
                { isButton: 'Complete', text: obj.paymentId, style: '' },
                { isButton: '', text: obj.orderId, style: '' },
                { isButton: '', text: obj.amount, style: '' },
                { isButton: status, text: obj.status, style: 'px-3 py-2' },
            ],
        });
    });

    // Handle pagination controls
    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="w-screen h-screen flex flex-col">
            <div className="border-b-2 flex py-3 justify-between px-3">
                <h3 className="font-sans text-3xl font-semibold px-3 py-2">My Payments</h3>
            </div>
            <div className="w-full">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <table className="w-full border-collapse">
                        <TableHeader header={tableHeader}></TableHeader>
                        <tbody>
                            {tableRows.map((row: any, index: any) => (
                                <TableRow key={index} cellData={row.cellData} styles={row.style} />
                            ))}
                        </tbody>
                    </table>
                </div>
              
                <div className="flex justify-center mt-4 space-x-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 bg-gray-200 rounded ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 bg-gray-200 rounded ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;