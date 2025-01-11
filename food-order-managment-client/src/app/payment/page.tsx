import React from 'react'
import TableHeader from '../table/TableHeader'
import tableInterface from '../table/TableInteface'
import TableRow from '../table/TableRow'


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
        status: "Pending",
        amount: "29.0",
    },
    {
        paymentId: "1234567890",
        orderId: "123456789",
        status: "Pending",
        amount: "29.0",
    },
    {
        paymentId: "1234567890",
        orderId: "123456789",
        status: "Pending",
        amount: "29.0",
    },
    {
        paymentId: "1234567890",
        orderId: "123456789",
        status: "Pending",
        amount: "29.0",
    },
    {
        paymentId: "1234567890",
        orderId: "123456789",
        status: "Pending",
        amount: "29.0",
    },    {
        paymentId: "1234567890",
        orderId: "123456789",
        status: "Pending",
        amount: "29.0",
    },    {
        paymentId: "1234567890",
        orderId: "123456789",
        status: "Pending",
        amount: "29.0",
    },    {
        paymentId: "1234567890",
        orderId: "123456789",
        status: "Pending",
        amount: "29.0",
    },    {
        paymentId: "1234567890",
        orderId: "123456789",
        status: "Pending",
        amount: "29.0",
    },    {
        paymentId: "1234567890",
        orderId: "123456789",
        status: "Pending",
        amount: "29.0",
    },    {
        paymentId: "1234567890",
        orderId: "123456789",
        status: "Pending",
        amount: "29.0",
    },
    
]

const tableHeader: tableInterface = [
    {
        width: '25%',
        text: "paymentId",
        style: "",
    }, {
        width: '25%',
        text: "orderId",
        style: ""
    },
 
    {
        width: '25%',
        text: "amount",
        style: ""
    },
    {
        width: '25%',
        text: "status",
        style: ""
    },

]


let tableRows: { style: string; cellData: { isButton: string; text: string; style: string }[] }[] = [];
tableData.map((obj, index) => {
    let status = obj.status;
    tableRows.push({
        style: "", cellData: [{
            isButton: 'Complete',
            text: obj.paymentId,
            style: ''
        },
        {
            isButton: '',
            text: obj.orderId,
            style: ''
        }
      , {
            isButton: '',
            text: obj.amount,
            style: ''
        },
        {
            isButton: status,
            text: obj.status,
            style: 'px-3 py-2'
        }]
    })
})


const page = () => {
    return (
        <div className='w-screen h-screen flex flex-col'>
        <div className='border-b-2 flex py-3 justify-between px-3'>
            <h3 className='font-sans text-3xl font-semibold px-3 py-2'>My Payments</h3>
        </div>
        <div className='w-full'>
            <div className="p-6 bg-white rounded-lg shadow-md">
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
            </div>
        </div>
    </div>
    )
}

export default page
