import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import profile from '../../../public/login-1.jpeg';

interface UserHeaderProps {
  onSettingsClick: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ onSettingsClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [img, setImage] = useState<string | StaticImageData>(profile);

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

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="relative mr-48 max-lg:hidden">
      <button
        id="avatarButton"
        type="button"
        onClick={toggleDropdown}
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

      {isDropdownOpen && (
        <div
          id="userDropdown"
          className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-56"
        >
          <ul className="py-2 text-sm text-gray-700" aria-labelledby="avatarButton">
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  onSettingsClick();
                }}
              >
                Settings
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a href="#" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              sessionStorage.clear();
              window.location.href = '/login';
            }}
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHeader;
