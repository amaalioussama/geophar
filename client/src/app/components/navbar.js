'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LogoImage from '../../../public/pharmacie.png';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
   
    localStorage.removeItem('isLoggedIn');
 
    router.push('/login');
  };

  return (
    <>
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
         <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-green-500">
            <a href="#" className="flex items-center ps-2.5 mb-5">
            <Image src={LogoImage} alt="Pharmacy Logo" className='h-14 w-14' width={100} height={100} />
               <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white ml-5 mt-3">pharmacie</span>
            </a>
            <ul className="space-y-2 font-medium">
               <li>
                  <button onClick={handleLogout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-green-700  dark:bg-green-500 group">
                     <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                     </svg>
                     <span className="ms-3">LogOut</span>
                  </button>
               </li>
               <li>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-green-700  dark:bg-green-500 group">
                  <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-white group-hover:text-gray-900dark:group-hover:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
                     <span className="ms-3">About us</span>
                  </a>
               </li>
              
              
            </ul>
         </div>
      </aside>

      <div className="p-4 sm:ml-64">
       
      </div>
    </>
  );
};

export default Navbar;
