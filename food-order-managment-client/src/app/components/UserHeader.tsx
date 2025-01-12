'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import img from '../../../public/breakfast.png';

interface UserHeaderProps {
  onSettingsClick: () => void; // Prop for opening the modal
}

const UserHeader: React.FC<UserHeaderProps> = ({ onSettingsClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="relative mr-36 max-lg:hidden">
      <button
        id="avatarButton"
        type="button"
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full cursor-pointer"
      >
        <Image src={img} alt="User dropdown" className="w-10 h-10 rounded-full" />
      </button>

      {isDropdownOpen && (
        <div
          id="userDropdown"
          className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <div className="px-4 py-3 text-sm">
            <div>Bonnie Green</div>
            <div className="font-medium truncate">name@flowbite.com</div>
          </div>
          <ul className="py-2 text-sm text-gray-700" aria-labelledby="avatarButton">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Dashboard
              </a>
            </li>
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
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHeader;