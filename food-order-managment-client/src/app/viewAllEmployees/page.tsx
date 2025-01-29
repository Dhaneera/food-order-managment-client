'use client';
import SideBar from '../components/SideBar';
import TableHeader from '../table/TableHeader';
import TableRow from '../table/TableRow';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import ConfirmationModal from '../components/ConfirmationModal';

const Page = () => {
    const rowCountPerPage = 10;
    const [page, setPage] = useState(0);
    const [tableRows, setTableRows] = useState<any[]>([]);
    let [ref, setRef] = useState(-1);
    const updateRef = useRef(0);
    const [visible, setVisible] = useState(false)
    const [isAllApprovedusers, setIsAllApprovedUsers] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);


    const statusChangeMutation = useMutation({
        mutationKey: [tableRows, 'status'],
        mutationFn: () => changeStatus(updateRef.current),
        onSuccess: () => window.location.reload()
    })



    function changeStatus(index: any): any {
        axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/status/change/${index}`)

    }


    const router = useRouter();


    const { isLoading, isError, data } = useQuery({
        queryKey: ['employees', page],
        queryFn: async () => {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getAllEmployees?page=${page}&size=${rowCountPerPage}`
            );
            return response.data;
        },
        retry: 3
    });

    useEffect(() => {
        if (data?.content) {
            const rows = data.content.map((obj: any) => ({
                style: '',
                cellData: [
                    {
                        isButton: 'Complete',
                        text: obj.name,
                        style: '',
                    },
                    {
                        isButton: '',
                        text: String(obj.username),
                        style: 'py-8',
                    },
                    {
                        isButton: [obj.status == "ACTIVE" ? 'Complete' : obj.status == "PENDING" ? 'Pending' : 'Rejected'],
                        clickEvent: (e: any) => changeStatusOfEmployees(e, obj.id),
                        text: obj.status,
                        style: ''
                    },
                    {
                        isButton: 'icon',
                        text: <Trash2 width={100} className='ml-[-20%]' onClick={() => deleteFuction(obj.id)} />,
                        style: 'flex flex-row mt-3'
                    },
                ],
            }));
            setTableRows(rows);
        }
    }, [data]);


    function changeStatusOfEmployees(e: any, index: any) {
        updateRef.current = index
        setVisible(true);
    }

    const deleteMutation = useMutation({
        mutationFn: deleteFromDatabase(ref),
        mutationKey: [tableRows],

    })


    function deleteFuction(index: number) {
        setRef(index);
        if (ref != -1) {
            deleteMutation.mutate()
            tableRows.pop();
        }
    }




    // Navigate to another page
    const navigateToPlaceOrder = () => {
        router.push('/');
    };

    // Pagination handlers
    const handlePrevious = () => {
        if (page > 0) setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (data?.totalPages && page < data.totalPages - 1) {
            setPage((prev) => prev + 1);
        }
    };

    // Table headers
    const tableHeader = [
        { width: '30%', text: 'Name', style: '' },
        { width: '30%', text: 'Phone Number', style: '' },
        { width: '30%', text: 'Status', style: '' },
        { width: '30%', text: 'Delete', style: '' },
    ];

    const [sarch, setSearch]: any = useState('');

    function search(e: any): any {
        setSearch(e.target.value);
    }


    function getEmployeesforAppoval(): void {
        setIsAllApprovedUsers((prev) => !prev)
        statusChangeMutation.mutate();
    }

    function getEmployeeList(): any {
        serachEmployeeMutaion.mutate()
    }
    const serachEmployeeMutaion = useMutation({
        mutationKey: [tableRows],
        mutationFn: () => fetchDataForSearchedEmployees(currentPage - 1, sarch)
    })


    function fetchDataForSearchedEmployees(page: number, userName: any): any {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/serachEmployees?username=${userName}&page=${page}&size=${rowCountPerPage}`)
            .then((res) => {
                console.log(res.data.content);
                const object=res.data.content[0];
                setTableRows([{
                    style: '',
                    cellData: [
                        {
                            isButton: 'Complete',
                            text: object.name,
                            style: '',
                        },
                        {
                            isButton: '',
                            text: String(object.username),
                            style: 'py-8',
                        },
                        {
                            isButton: [object.status == "ACTIVE" ? 'Complete' : object.status == "PENDING" ? 'Pending' : 'Rejected'],
                            clickEvent: (e: any) => changeStatusOfEmployees(e, object.id),
                            text: object.status,
                            style: ''
                        },
                        {
                            isButton: 'icon',
                            text: <Trash2 width={100} className='ml-[-20%]' onClick={() => deleteFuction(object.id)} />,
                            style: 'flex flex-row mt-3'
                        },
                    ],
                }]);
                
                return res
            }).catch((err) => {
                setTableRows([])
                return err
            })
    }
    return (
        <>
            {visible ? <ConfirmationModal clickEvent={statusChangeMutation.mutate} setVisible={setVisible} /> : <></>}
            <div className="flex items-center">
                <div className="flex">
                    <SideBar />
                </div>
                <div className="w-full flex flex-col items-center">
                    <div className="p-6 w-[85%] bg-white rounded-xl shadow-md">
                        <h3 className="font-sans text-3xl font-semibold px-3 py-4">
                            View All Employees
                        </h3>
                        <div className='flex items-end gap-5'>
                            <button className=' px-8 py-4 rounded-2xl bg-[#e6e6f6] font-sans font-semibold mb-10  ' onClick={() => getEmployeesforAppoval()}>{isAllApprovedusers ? 'Approve Employee' : 'All Employees'}</button>

                            <div className='flex  flex-auto justify-end'>
                                <div className=' m-12  ring  ring-orange-300 hover:ring-orange-400  active:ring-orange-400     rounded border'>
                                    <input
                                        type="text"
                                        name="search"
                                        placeholder="Search..."
                                        onChange={(e) => search(e)} />

                                </div>
                                <button className=' mt-10  px-4 rounded-2xl bg-[#e6e6f6] font-sans font-semibold mb-10  ' onClick={() => getEmployeeList()}> Search Employee</button>
                            </div>

                        </div>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : isError ? (
                            <p>Something went wrong!</p>
                        ) : (
                            <table className="w-full border-collapse">
                                <TableHeader header={tableHeader} />
                                <tbody>
                                    {tableRows.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            cellData={row.cellData}
                                            styles={row.style}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="flex justify-center mt-4 space-x-4">
                        <button
                            onClick={handlePrevious}
                            disabled={page === 0}
                            className={`px-4 py-2 bg-gray-200 rounded-l-3xl ${page === 0 && 'opacity-50 cursor-not-allowed'
                                }`}
                        >
                            Previous
                        </button>
                        <span className="mt-2">
                            Page {page + 1} of {data?.totalPages || 1}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={data?.totalPages && page >= data.totalPages - 1}
                            className={`px-4 py-2 bg-gray-200 rounded-r-3xl ${data?.totalPages && page >= data.totalPages - 1
                                ? 'opacity-50 cursor-not-allowed'
                                : ''
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;

function deleteFromDatabase(indexforDelete: number): any {
    if (indexforDelete !== -1) {
        axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/delete/${indexforDelete}`).then((res: any) => {
            console.log(res)
        })
    }
}




