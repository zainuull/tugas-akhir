'use client';
import useUser from '@/core/services/store/store.user';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
// Icons
import { BsHouse, BsClockHistory, BsArrowRightShort, BsArrowDownShort } from 'react-icons/bs';
import { GoGitPullRequest, GoGear } from 'react-icons/go';

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
        <h1 className='text-2xl font-bold'>Welcome</h1>
      </Link>
      <Image src={'/assets/separator.png'} alt="logo" width={200} height={200} />
      {/* Dashboard */}
      <div className="w-full flex justify-end">
        <Link
          href={'/dashboard'}
          className={`${
            pathname == '/dashboard'
              ? 'bg-secondary transition-all duration-300 text-black font-bold'
              : 'cursor-pointer'
          } w-5/6 flex items-center justify-between rounded-l-lg p-2`}>
          <div className="flex items-center gap-x-3">
            <BsHouse size={20} />
            Dashboard
          </div>
        </Link>
      </div>
      {/* Request */}
      {/* <div className="w-full flex justify-end">
        <button
          onClick={() => handleDropDown('request')}
          className={` w-5/6 flex items-center justify-between rounded-l-lg p-2`}>
          <div className="w-full flex items-center gap-x-3">
            <GoGitPullRequest size={20} />
            Request
            {isOpen.request ? (
              <BsArrowDownShort className="translate-x-full" />
            ) : (
              <BsArrowRightShort className="translate-x-full" />
            )}
          </div>
        </button>
      </div> */}
      {/* Request Menu */}
      {/* {isOpen.request && (
        <>
          <div className={`w-full flex justify-end`}>
            <Link
              href={'/request/credit'}
              className={`${
                pathname.match(/^\/request\/credit/)
                  ? 'bg-secondary transition-all duration-300 text-black font-bold'
                  : 'cursor-pointer'
              } w-5/6 flex items-center justify-between rounded-l-lg p-2`}>
              <p> Credit</p>
            </Link>
          </div>
          <div className={`w-full flex justify-end`}>
            <Link
              href={'/request/activation'}
              className={`${
                pathname.match(/^\/request\/activation/)
                  ? 'bg-secondary transition-all duration-300 text-black font-bold'
                  : 'cursor-pointer'
              } w-5/6 flex items-center justify-between rounded-l-lg p-2`}>
              <p> Activation</p>
            </Link>
          </div>
          <div className={`w-full flex justify-end`}>
            <Link
              href={'/request/injection'}
              className={`${
                pathname.match(/^\/request\/injection/)
                  ? 'bg-secondary transition-all duration-300 text-black font-bold'
                  : 'cursor-pointer'
              } w-5/6 flex items-center justify-between rounded-l-lg p-2`}>
              <p> Injection</p>
            </Link>
          </div>
          <div className={`w-full flex justify-end`}>
            <Link
              href={'/request/new-cards'}
              className={`${
                pathname.match(/^\/request\/new-cards/)
                  ? 'bg-secondary transition-all duration-300 text-black font-bold'
                  : 'cursor-pointer'
              } w-5/6 flex items-center justify-between rounded-l-lg p-2`}>
              <p> New Cards</p>
            </Link>
          </div>
        </>
      )} */}

      {/* History */}
      {/* <div className={`w-full flex justify-end`}>
        <Link
          href={'/history'}
          className={`${
            pathname.match(/^\/history/)
              ? 'bg-secondary transition-all duration-300 text-black font-bold'
              : 'cursor-pointer'
          } w-5/6 flex items-center justify-between rounded-l-lg p-2`}>
          <div className="flex items-center gap-x-3">
            <BsClockHistory size={20} />
            History
          </div>
        </Link>
      </div> */}

      {/* Setting */}
      <div className="w-full flex justify-end">
        <button
          onClick={() => handleDropDown('setting')}
          className={` w-5/6 flex items-center justify-between rounded-l-lg p-2`}>
          <div className="w-full flex items-center gap-x-3">
            <GoGear size={20} />
            Setting
            {isOpen.setting ? (
              <BsArrowDownShort className="translate-x-full" />
            ) : (
              <BsArrowRightShort className="translate-x-full" />
            )}
          </div>
        </button>
      </div>
      {/* Setting Menu */}
      {isOpen.setting && (
        <>
          <div className={`w-full flex justify-end text-sm`}>
            <Link
              href={'/setting/user-management'}
              className={`${
                pathname.match(/^\/setting\/user-management/)
                  ? 'bg-secondary transition-all duration-300 text-black font-bold'
                  : 'cursor-pointer'
              } w-5/6 flex items-center justify-between rounded-l-lg p-2`}>
              <p>User Management</p>
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Sidebar;
