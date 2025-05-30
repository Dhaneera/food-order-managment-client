import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import profile from '../../../public/profileImage.jpg';
import ErrorModal from './ErrorModal';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCheck, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function   IssueMeal({ mealData, ...props }: any) {
  const [issued, setIssued] = useState(false);
  const [showCompletion,setShowCompletion] = useState(false);
  const [isintial, setIsIntial] = useState(false);
  const [img, setImage] = useState<string | StaticImageData>(profile);
  const count = useRef(0);
  const mealId = useRef('');

  const mutate = useMutation({
    mutationKey: [mealId.current],
    mutationFn: async () => {
      if (mealId.current !== '') {
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/meal/status/${mealId.current}`)
          .then((res: any) => {
    
            return res.data
          })
      }
    },
    retry: 2,
    retryDelay: 5000,
    onSuccess: (data: any) => {
      setIssued(false);
      setShowCompletion(true);
      return (
        <ErrorModal />
      )
    },
    onError: (error: any) => {
      props.setError(error.response.data);
    },
  })

  const handleIssueOrder = (e: any) => {
    setIssued(true);
    setTimeout(()=>{
      setShowCompletion(false);
      setIsIntial(true);
    },5000)
    debugger
    mealId.current = mealData.search;
    mutate.mutateAsync();
  };


  const { isLoading, isError } = useQuery({
    queryKey: ['userImage'],
    queryFn: async () => {
      if (count.current == 0) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/images/image/base64/${mealData.image}`,
          { responseType: 'arraybuffer' }
        );
        const blob = new Blob([response.data], { type: 'image/jpeg' });
        const profileImage = URL.createObjectURL(blob);
        if (profileImage) {
          setImage(profileImage);
        }
        return response;
      }
      return null;
    },
    refetchInterval: false,
    retry: 3,
  });


  if (props.error != '') {
    return (
      <>
      </>
    )
  }


  return props.order == null && props.order == undefined || isintial? (
    <div className=" w-1/3 ml-12 bg-white border flex justify-center items-center rounded-lg shadow-xl p-6 text-center max-lg:w-1/2">
      <h3 className='font-bold font-sans text-2xl'>Search for a meal in order to show here</h3>
    </div>
  ) : (
    <>
      <div className='absolute top-4 right-3'>
      {showCompletion!=false?
      <Alert>   
        <CheckCheck strokeWidth={1}></CheckCheck>
        <AlertTitle>Order Completed Successfully</AlertTitle>
        <AlertDescription>
          Meal Has been successfully updated to complete status.
        </AlertDescription>
      </Alert>:<></>
      }
      </div>
      <div className=" w-1/3 ml-12 bg-white border rounded-lg shadow-xl p-6 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Issue Meal</h3>

        <div className="text-left mb-6">
          <p className="text-lg text-gray-600">
            <span className="font-medium text-gray-800">Meal ID:</span> #{mealData.mealId}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 mb-6">
          <Image
            src={typeof img === 'string' ? img : profile}
            alt="User dropdown"
            width={1600}
            height={1600}
            className="w-48 h-48 rounded-full"
          />
          <p className="text-lg font-medium text-gray-800">{mealData.name}</p>
          <p className="text-gray-500">{mealData.contact}</p>
        </div>

        <div className="flex justify-between items-center text-lg font-medium text-gray-600 mb-6">
          <span>{mealData?.mealId?.substring(0, 2) == 'BR' ? `Breakfast` : mealData?.mealId?.substring(0, 2) == 'LN' ? `Lunch` : `Dinner`}</span>
          <span>{mealData.quantity}</span>
        </div>

        <Button
          onClick={(e) => handleIssueOrder(e)}
          disabled={issued}
          className={` lg:py-3 lg:px-20 rounded-lg text-lg font-medium ${issued
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-100 text-green-600 hover:bg-green-200'
            } transition-all`}
        >
          {issued ? 'Order Issued' : 'Issue Order'}
        </Button>
      </div>
    </>
  );
}