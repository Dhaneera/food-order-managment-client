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
import { Button } from '@/components/ui/button';
import { setDate } from 'date-fns';
import { AlertDialog } from '@radix-ui/react-alert-dialog'
import { AlertDescription } from '@/components/ui/alert'
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { promises } from 'dns';

// import statue from '@/../public/login-2.png';

const Page = () => {

    const rowCountPerPage = 5;
    const [page, setPage] = useState(0);
    const [tableRows, setTableRows] = useState<any[]>([]);
    let [ref, setRef] = useState(-1);
    let [mobileNumber, setMobileNumber] = useState("")
    const updateRef = useRef(0);
    const [visible, setVisible] = useState(false)
    const [isAllApprovedusers, setIsAllApprovedUsers] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [userProfile, setUserProfile] = useState(false);
    const [showModal, SetShowModal] = useState(false)
    const [info, setInfo] = useState(-1);
    const [userIndividual, setuserIndividual]: any = useState(null);


    const statusChangeMutation = useMutation({
        mutationKey: [tableRows, 'status'],
        mutationFn: () => changeStatus(updateRef.current),

    })


    function changeStatus(index: any): any {
        axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/status/change/${index}`)

    }

    const approvalGetMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/type?page=0&size=10`, {
                type: "staff",
                status: "Pending"
            });
            console.log(response)
            return response.data;
        },
        onSuccess: (data) => {
            if (data?.content?.length) {
                const object = data.content[0];
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
                            click: (e: any) => profileShow(e, object.userId)
                        },
                        {
                            isButton: [object.status === "ACTIVE" ? 'Complete' : object.status === "PENDING" ? 'Pending' : 'Rejected'],
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
            }
        },
        onError: (error) => {
            console.error("Error fetching data:", error);
        }
    });







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
                        text: <Trash2 width={100} className='ml-[-20%]' onClick={() => deleteModalActivate(obj.id)} />,
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
        mutationFn: () => deleteFromDatabase(ref),
        mutationKey: [data],
        onSuccess: () => {
            window.location.reload();
        }

    })

    if (deleteMutation.isPending) {
        <Loader></Loader>
    }

    const getMutaion = useMutation({
        mutationKey: [],
        mutationFn: getEmployeeById,
        retry: 1,
        retryDelay: 5000
    })




    function deleteFuction(index: number) {
        setRef(index);
        debugger

        deleteMutation.mutate()
        tableRows.pop();

        SetShowModal(false)
        router.refresh();
    }

    function deleteModalActivate(obj: any) {
        setInfo(obj)
        SetShowModal(true);
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
        setIsAllApprovedUsers((prev) => {
            const newApprovalStatus = !prev;
            
            approvalGetMutation.mutate();
    
            if (newApprovalStatus == false) {
                // Reload the page when approval status changes
                window.location.reload();
            }
    
            return newApprovalStatus;
        });
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
                            click: (e: any) => profileShow(e, object.userId)

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

    function getEmployeeById(mobileNumber: number): any {

        try {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getByUsername?username=${mobileNumber}`).then((res) => {
                setuserIndividual(res.data);

            })
        } catch (error) {
            throw error;
        }

    }


    async function deleteFromDatabase(indexforDelete: number) {
        if (indexforDelete !== -1) {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/delete/${indexforDelete}`).then((res: any) => {
            })
            return res;
        }

    }

    return getMutaion.isPending ? (
        <Loader />) : (
        <>
            {visible ? <ConfirmationModal clickEvent={statusChangeMutation.mutate} setVisible={setVisible} /> : <></>}
            <div className="flex items-center">
                {userProfile == true ? <Sheet open={userProfile} onOpenChange={() => setUserProfile(prev => !prev)} >
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>View profile</SheetTitle>
                            <SheetDescription className='pt-5'>
                                Description of the employee selected from table below
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid  gap-6  ">
                            <div className="grid grid-cols-2 mt-4 font-sans ">
                                <Label htmlFor="name" className=" text-pretty text-base">
                                    NIC
                                </Label>
                                <h2 id='name' className='col-span-3 text-gray-700 font-thin'>{userIndividual?.username}</h2>

                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className=" text-pretty text-base">
                                    Name
                                </Label>
                                <h2 id='name' className='col-span-4 text-gray-700 font-thin'>{userIndividual?.name}</h2>

                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className=" text-pretty text-base">
                                    Role
                                </Label>
                                <h2 id='name' className='col-span-4 text-gray-700 font-thin'>{userIndividual?.roles[0].name.toString().replaceAll('_', ' ')}</h2>

                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className=" text-pretty text-base">
                                    Status
                                </Label>
                                <h2 id='name' className='col-span-4 text-gray-700 font-thin'>{userIndividual?.status}</h2>

                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className="  text-pretty text-base">
                                    Mobile
                                </Label>
                                <h2 id='name' className='col-span-4 text-gray-700 font-thin'>{userIndividual?.username}</h2>

                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className="   text-pretty text-base">
                                    Mail
                                </Label>
                                <h2 id='name' className='col-span-4 text-gray-700 font-thin'>{userIndividual?.mail}</h2>

                            </div>
                        </div>
                        <SheetFooter>
                        </SheetFooter>
                    </SheetContent>
                </Sheet> : <></>}
                <div className="flex">
                    <SideBar />
                </div>
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
                                <AlertDialogAction onClick={() => deleteFuction(info)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog> : <></>}
                    <div className="p-6 w-[85%] bg-white rounded-xl shadow-md">
                        <h3 className="font-sans text-3xl font-semibold px-3 py-4">
                            View All Employees
                        </h3>
                        <div className='flex items-end gap-5'>
                            <Button
                                className=' font-sans font-semibold mb-10  '
                                onClick={() => getEmployeesforAppoval()}>
                                {isAllApprovedusers ? 'Approve Employee' : 'All Employees'}
                            </Button>

                            <div className='flex  flex-auto justify-end'>
                                <div className=' m-12  ring ring-black     rounded border'>
                                    <input
                                        type="text"
                                        name="search"
                                        placeholder="Search..."
                                        onChange={(e) => search(e)} />

                                </div>
                                <Button className=' mt-10  font-sans font-semibold max-lg: mr-[10%]  ' onClick={() => getEmployeeList()}> Search Employee</Button>
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







