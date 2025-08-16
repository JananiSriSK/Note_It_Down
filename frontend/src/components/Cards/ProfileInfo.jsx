// import React from 'react'
// import { getInitials } from '../../utils/helper'
// import { Link } from "react-router-dom";

// const ProfileInfo = ({onLogOut, userInfo}) => {
//   return (
//     <div className='flex items-center gap-3'>
    

//        <div className='w-12 h-12 flex items-center justify-center rounded-full
//        text-slate-950 font-medium bg-slate-100'> 
//        {getInitials(userInfo?.username)}
//        </div> 
//         <div>
//             <p className='text-sm font-medium'>{userInfo?.username}</p>
//         </div>
//         <button className='text-sm bg-violet-300 p-1
//         rounded-sm text-black hover:bg-violet-400' onClick={onLogOut} >
        
//         <Link to={"/login"} className='font-medium text-black '>
//         Logout</Link>
//         </button>
    
    
//     </div>
//   )
// }

// export default ProfileInfo


import React, { useState } from 'react';
import { getInitials } from '../../utils/helper';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const ProfileInfo = ({ onLogOut, userInfo }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='relative flex items-center gap-3 px-4'>
      {/* User Initials */}
      <div
        className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer'
        onClick={toggleDropdown}
      >
        {" "+getInitials(userInfo?.username)}
        <FaChevronDown className='ml-2 text-sm' />
      </div>


      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className='absolute right-0 mt-40 bg-white shadow-lg rounded-md p-2 w-40'>
          <p className='text-sm font-medium'>{"Hey " + userInfo?.username+ " ☺️"}</p>
          <hr className='my-1' />
          <button
            className='text-sm bg-violet-300 p-2 rounded-sm text-black w-full text-left hover:bg-violet-400'
            onClick={onLogOut}
          >
            <Link to='/login' className='flex items-center justify-center font-medium text-black'>
              Logout
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
