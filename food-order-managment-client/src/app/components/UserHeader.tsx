import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import profile from '../../../public/login-1.jpeg';
import Modal from './Modal';

interface UserHeaderProps {
  onSettingsClick: () => void;
  sign : string
}

const UserHeader: React.FC<UserHeaderProps> = ({ onSettingsClick,sign }:any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [img, setImage] = useState<string | StaticImageData>(profile);
  const[modal,setModal]=useState(false);

  const { isLoading, isError } = useQuery({
    queryKey: ['userImage'],
    queryFn: async () => {
      const userId = sessionStorage.getItem('userId');
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/images/image/base64/${userId}`,
        { responseType: 'arraybuffer' } 
      );
      const blob = new Blob([response.data], { type: 'image/jpeg' });
      const profileImage=URL.createObjectURL(blob);
      if(profileImage){
        setImage(profileImage);
      }
      return response;
    },
    refetchInterval: 10000,
    retry: 0,
  });


  function handleClick(e:any):any{
    setModal(true)
  }

  return modal?(<Modal title='image' isVisible={true} onClose={function (): void {
    throw new Error('Function not implemented.');
  } } onDiscard={function (): void {
    throw new Error('Function not implemented.');
  } } onSubmit={function (formData: { name: string; contact: string; image: File | null; }): void {
    throw new Error('Function not implemented.');
  } }  /> ):(
    <div className=" mt-[100%] flex  max-lg:hidden mb-8">
      <button
        id="avatarButton"
        type="button"
        onClick={(e)=>handleClick(e)}
        className="w-10 h-10 rounded-full cursor-pointer"
      >
        <Image
          src={typeof img === 'string' ? img : profile}
          alt="User dropdown"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
      </button>
    </div>
  );
};

export default UserHeader;
