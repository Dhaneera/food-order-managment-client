"use client"
import React, { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useQuery } from '@tanstack/react-query';
import profile from '../../../public/profileImage.jpg'
import axios from 'axios';
import Modal from './Modal';

interface UserHeaderProps {
  onSettingsClick: () => void;
  sign: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({ onSettingsClick, sign }: any) => {
  const [img, setImage] = useState<string | StaticImageData>(profile); // Use a default image
  const [modal, setModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(true);

  const { data } = useQuery({
    queryKey: ['userImage'],
    queryFn: async () => {
      const userId = sessionStorage.getItem('userId');
      if (!userId) return null; // Ensure userId is available
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/images/image/base64/${userId}`,
        { responseType: 'arraybuffer' }
      );
      return response.data;
    },
    refetchInterval: 10000,
    retry: 0,
  });

  useEffect(() => {
    if (data && data.byteLength>0) {
      const blob = new Blob([data], { type: 'image/jpeg' });
      const profileImage = URL.createObjectURL(blob);
      
      setImage(profileImage);
    }else{
      debugger
      setImage(profile);
    }
  }, [data]);

  function handleClick() {
    setModal(true);
  }
  function handleDiscard() {
    setModal(false);
  }

  return (
    <>
      {modal && <Modal title="User Settings" onClose={handleDiscard} onDiscard={handleDiscard} isVisible={isModalVisible} />}
      <div className="mt-[100%] flex mb-8">
        <button id="avatarButton" type="button" onClick={handleClick} className="w-10 h-10 rounded-full cursor-pointer">
          <Image
            src={img}
            alt="User dropdown"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        </button>
      </div>
    </>
  );
};

export default UserHeader;