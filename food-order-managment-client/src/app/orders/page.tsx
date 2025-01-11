import React from 'react'
import tableInterface from '../table/TableInteface'
import TableHeader from '../table/TableHeader'
import TableRow from '../table/TableRow'

const Page = () => {
    const mock_data =
        [{
            id: "4a2a3e8a-fb2f-4e09-b96f-02800e7ac0a6",
            name: "Dinner Combo",
            status: "Pending",
            price: "29.0",
            createdBy: "JohnDoe",
            createdAt: "2025-01-10T18:30:00",
            orderedAt: "2025-01-10T19:00:00"
        },
        {
            id: "4a2a3e8a-fb2f-4e09-b96f-02800e7ac0a6",
            name: "Dinner Combo",
            status: "Pending",
            price: "29.0",
            createdBy: "JohnDoe",
            createdAt: "2025-01-10T18:30:00",
            orderedAt: "2025-01-10T19:00:00"

        },
        {
            id: "4a2a3e8a-fb2f-4e09-b96f-02800e7ac0a6",
            name: "Dinner Combo",
            status: "Pending",
            price: "29.0",
            createdBy: "JohnDoe",
            createdAt: "2025-01-10T18:30:00",
            orderedAt: "2025-01-10T19:00:00"

        },
        {
            id: "4a2a3e8a-fb2f-4e09-b96f-02800e7ac0a6",
            name: "Dinner Combo",
            status: "Pending",
            price: "29.0",
            createdBy: "JohnDoe",
            createdAt: "2025-01-10T18:30:00",
            orderedAt: "2025-01-10T19:00:00"

        },
        {
            id: "4a2a3e8a-fb2f-4e09-b96f-02800e7ac0a6",
            name: "Dinner Combo",
            status: "Pending",
            price: "29.0",
            createdBy: "JohnDoe",
            createdAt: "2025-01-10T18:30:00",
            orderedAt: "2025-01-10T19:00:00"

        }
        ,
        {
            id: "4a2a3e8a-fb2f-4e09-b96f-02800e7ac0a6",
            name: "Dinner Combo",
            status: 'Complete',
            price: "29.0",
            createdBy: "JohnDoe",
            createdAt: "2025-01-10T18:30:00",
            orderedAt: "2025-01-10T19:00:00"

        }
        ,
        {
            id: "4a2a3e8a-fb2f-4e09-b96f-02800e7ac0a6",
            name: "Dinner Combo",
            status: "Pending",
            price: "29.0",
            createdBy: "JohnDoe",
            createdAt: "2025-01-10T18:30:00",
            orderedAt: "2025-01-10T19:00:00"

        }
        ,
        {
            id: "4a2a3e8a-fb2f-4e09-b96f-02800e7ac0a6",
            name: "Dinner Combo",
            status: "Pending",
            price: "29.0",
            createdBy: "JohnDoe",
            createdAt: "2025-01-10T18:30:00",
            orderedAt: "2025-01-10T19:00:00"

        }
        ,
        {
            id: "4a2a3e8a-fb2f-4e09-b96f-02800e7ac0a6",
            name: "Dinner Combo",
            status: "Pending",
            price: "29.0",
            createdBy: "JohnDoe",
            createdAt: "2025-01-10T18:30:00",
            orderedAt: "2025-01-10T19:00:00"

        }
        ]

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
    mock_data.map((obj, index) => {
        let status= obj.status;
        tableRows.push({
            style: "", cellData: [{
                isButton: 'Complete',
                text: obj.id,
                style: ''
            },
            {
                isButton: '',
                text: obj.price,
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
                style: 'bg-[#faeee6] px-3 py-2'
            }]
        })
    })

    return (
        <div className='w-screen h-screen flex flex-col'>
            <div className='border-b-2 flex py-3 justify-between px-3'>
                <h3 className='font-sans text-3xl font-semibold px-3 py-2'>My Orders</h3>
                <button className='px-6 rounded-2xl bg-[#e6f6e9] font-sans font-semibold'>Place Order</button>
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

export default Page