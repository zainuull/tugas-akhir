'use client';
// Icons
import { IoNotificationsCircleOutline, IoChevronDownSharp } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { IoChevronForward } from 'react-icons/io5';
import { HiArrowNarrowLeft } from 'react-icons/hi';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Notification from './notification';
import { NotifyService } from '@/core/services/notify/notifyService';
import useUser from '@/core/services/store/store.user';
import { signOut, useSession } from 'next-auth/react';

interface IHeader {
  isOverlay: boolean;
  setIsOverlay: Function;
}

const Header = (props: IHeader) => {
  const session = useSession();
  const { isOverlay, setIsOverlay } = props;
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const pathname = usePathname();
  const [pageName, setPageName] = useState<string>('');
  const router = useRouter();
  const [isNotif, setIsNotif] = useState<boolean>(false);
  const notify = new NotifyService();
  const profil = session.data?.user;

  const pathToPageName: { [key: string]: string } = {
    '/setting/user-management': 'User Management',
    '/setting': 'Setting',
  };

  useEffect(() => {
    const matchingPath = Object.keys(pathToPageName).find((path) => pathname.startsWith(path));
    setPageName(matchingPath ? pathToPageName[matchingPath] : 'Dashboard');
  }, [pathname]);

  const handleBack = () => {
    router.back();
  };

  const handleNotif = () => {
    setIsOverlay(!isOverlay);
    setIsNotif(!isNotif);
  };

  const deleteCookie = (cookieName: string) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const handleLogout = () => {
    notify.confirmationLogout().then((res) => {
      if (res) {
        signOut();
      }
    });
  };

  return (
    <nav className="w-full h-24 rounded-lg p-4 bg-primary text-white flex items-center justify-between mb-2 select-none">
      <h1 className="flex items-center gap-x-2 px-2">
        {pathname.startsWith('/history/detail') && (
          <button onClick={handleBack} className="hover:text-gray-200 transition-all">
            <HiArrowNarrowLeft />
          </button>
        )}
        <span className="text-xl">{pageName}</span>
      </h1>
      <div className="flex items-center gap-x-4">
        {/* Notif Icon */}
        <IoNotificationsCircleOutline size={30} onClick={handleNotif} className="cursor-pointer" />
        <div className="flex items-center gap-x-4">
          <CgProfile size={27} />
          <h1>{profil?.name || 'unknown'}</h1>
          {isMenu ? (
            <IoChevronDownSharp onClick={() => setIsMenu(!isMenu)} className="cursor-pointer" />
          ) : (
            <IoChevronForward onClick={() => setIsMenu(!isMenu)} className="cursor-pointer" />
          )}
        </div>
      </div>
      {/* Notif */}
      <Notification isNotif={isNotif} setIsNotif={setIsNotif} />
      {/* Menu */}
      {isMenu && (
        <div className="absolute w-44 h-10 text-black bg-white rounded-xl right-4 top-24 flex flex-col items-start justify-center px-4  hover:text-primary transition-all shadow-md z-10">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Header;
