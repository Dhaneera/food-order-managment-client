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
import Loader from '../components/Loader';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
// import statue from '@/../public/login-2.png';

const Page = () => {
    const rowCountPerPage = 5;
    const [page, setPage] = useState(0);
    const [tableRows, setTableRows] = useState<any[]>([]);
    let [ref, setRef] = useState(-1);
    let [mobileNumber,setMobileNumber]=useState("")
    const updateRef = useRef(0);
    const [visible, setVisible] = useState(false)
    const [isAllApprovedusers, setIsAllApprovedUsers] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [userProfile, setUserProfile] = useState(false);


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
            console.log(response.data)
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
                        click: (e: any) => profileShow(e, obj.username)
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

    const getMutaion=useMutation({
        mutationKey:[],
        mutationFn:getEmployeeById,
        retry:1,
        retryDelay:5000
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
              
                const object = res.data.content[0];
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
                            click:(e:any)=>profileShow(e, object.userId)

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


    if (isLoading) {
        return <Loader />
    }


    function profileShow(e: any, userId: any) {
        setUserProfile(true)
        getMutaion.mutate(userId);
    }

    function getEmployeeById(mobileNumber: number):any {
     
        try {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getByUsername?username=${mobileNumber}`).then((res)=>{
                return res.data
            })
        } catch (error) {
            throw error;
        }
       
    }

    console.log(data)
    return getMutaion.isPending?(
        <Loader/>):(
        <>
            {visible ? <ConfirmationModal clickEvent={statusChangeMutation.mutate} setVisible={setVisible} /> : <></>}
            <div className="flex items-center">
                {userProfile == true ? <Sheet open={userProfile} onOpenChange={()=>setUserProfile(prev=>!prev)} >
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>View profile</SheetTitle>
                            <SheetDescription className='pt-5'>
                                Description of the employee selected from table below
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid  gap-6  ">
                            <Image
                                src={data.content[0].imageStore}
                                alt="Statue"
                                className=" ml-24 mt-5  size-40  rounded-2xl"
                            />
                            <div className="grid grid-cols-2 font-sans ">
                                <Label htmlFor="name" className=" text-pretty text-base">
                                    NIC
                                </Label>
                                <h2 id='name' className='col-span-3 text-gray-700 font-thin'>{data.content[0].moreEmpInfo.nic}</h2>

                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className=" text-pretty text-base">
                                    Name
                                </Label>
                                <h2 id='name' className='col-span-4 text-gray-700 font-thin'>{data.content[0].name}</h2>

                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className=" text-pretty text-base">
                                    Gender
                                </Label>
                                <h2 id='name' className='col-span-4 text-gray-700 font-thin'>{data.content[0].moreEmpInfo.gender}</h2>

                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className=" text-pretty text-base">
                                    Department
                                </Label>
                                <h2 id='name' className='col-span-4 text-gray-700 font-thin'>{data.content[0].moreEmpInfo.department}</h2>

                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className=" text-pretty text-base">
                                    Status
                                </Label>
                                <h2 id='name' className='col-span-4 text-gray-700 font-thin'>{data.content[0].status}</h2>

                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className="  text-pretty text-base">
                                    Mobile
                                </Label>
                                <h2 id='name' className='col-span-4 text-gray-700 font-thin'>{data.content[0].username}</h2>

                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className="   text-pretty text-base">
                                    Mail
                                </Label>
                                <h2 id='name' className='col-span-4 text-gray-700 font-thin'>{data.content[0].mail}</h2>

                            </div>
                        </div>
                        <SheetFooter>
                        </SheetFooter>
                    </SheetContent>
                </Sheet> : <></>}
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
            
        })
    }
}





