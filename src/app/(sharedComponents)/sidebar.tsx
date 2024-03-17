'use client';
import useUser from '@/core/services/store/store.user';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
// Icons
import { BsHouse } from 'react-icons/bs';
import { FaWpforms } from 'react-icons/fa6';
import { GoGitPullRequest } from 'react-icons/go';
import { RiAdminLine } from 'react-icons/ri';

const Sidebar = () => {
  const [user] = useUser();
  const pathname = usePathname();
  const [isOpen, setIsOpem] = useState({
    request: false,
    setting: false,
  });
  const role = user.data?.privilege?.general_role;

  useEffect(() => {
    if (pathname.startsWith('/request')) {
      setIsOpem({
        ...isOpen,
        request: true,
      });
    } else if (pathname.startsWith('/setting')) {
      setIsOpem({
        ...isOpen,
        setting: true,
      });
    } else {
      setIsOpem({
        ...isOpen,
        request: false,
        setting: false,
      });
    }
  }, [pathname === '/request' || pathname == '/setting']);

  const handleDropDown = (key: 'request' | 'setting') => {
    setIsOpem({
      ...isOpen,
      [key]: !isOpen[key],
    });
  };

  return (
    <nav className="w-60 min-h-full  bg-primary rounded-t-lg text-white flex flex-col items-center gap-y-4 py-8 relative ">
      <Link href={'/'}>
        {/* <Image src={'/assets/logo.png'} alt="logo" width={150} height={150} /> */}
        <h1 className="text-2xl font-bold">Welcome</h1>
      </Link>
      <Image src={'/assets/separator.png'} alt="logo" width={200} height={200} />
      {/* Dashboard */}
      <div className="w-full flex justify-end">
        <Link
          href={'/dashboard'}
          className={`${
            pathname == '/dashboard' || pathname == '/'
              ? 'bg-secondary transition-all duration-300 text-black font-bold'
              : 'cursor-pointer'
          } w-5/6 flex items-center justify-between rounded-l-lg p-2`}>
          <div className="flex items-center gap-x-3">
            <BsHouse size={20} />
            Dashboard
          </div>
        </Link>
      </div>
      {/* Participant */}
      <div className="w-full flex justify-end">
        <Link
          href={'/participant-management'}
          className={`${
            pathname.match(/^\/participant-management/)
              ? 'bg-secondary transition-all duration-300 text-black font-bold'
              : 'cursor-pointer'
          } w-5/6 flex items-center justify-between rounded-l-lg p-2`}>
          <div className="flex items-center gap-x-3">
            <GoGitPullRequest size={20} />
            Data Peserta
          </div>
        </Link>
      </div>
      {/* Admin */}
      {/* <div className="w-full flex justify-end">
        <Link
          href={'/admin-management'}
          className={`${
            pathname.match(/^\/admin-management/)
              ? 'bg-secondary transition-all duration-300 text-black font-bold'
              : 'cursor-pointer'
          } w-5/6 flex items-center justify-between rounded-l-lg p-2`}>
          <div className="flex items-center gap-x-3">
            <RiAdminLine size={20} />
            Data Admin
          </div>
        </Link>
      </div> */}
      {/* Register */}
      <div className="w-full flex justify-end">
        <Link
          href={'/form-register'}
          className={`${
            pathname == '/form-register'
              ? 'bg-secondary transition-all duration-300 text-black font-bold'
              : 'cursor-pointer'
          } w-5/6 flex items-center justify-between rounded-l-lg p-2`}>
          <div className="flex items-center gap-x-3">
            <FaWpforms size={20} />
            Register Form
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
