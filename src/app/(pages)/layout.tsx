'use client';
import { usePathname } from 'next/navigation';
// components
import Header from '../(sharedComponents)/header';
import Sidebar from '../(sharedComponents)/sidebar';
import useOverlay from './store/store.notif';
import { useEffect, useState } from 'react';

const listDisabled = ['/login', '/register'];

function isHeaderDisabled(pathname: string): boolean {
  return !listDisabled.some((disabledPath) => pathname.startsWith(disabledPath));
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const headerDisabled = isHeaderDisabled(pathname);
  const [isOverlay, setIsOverlay] = useOverlay();

  return (
    <div className="bg-secondary w-full h-screen overflow-y-scroll">
      {headerDisabled && (
        <div className="relative">
          <div className="w-full min-h-[100vh] flex gap-x-4 px-4 pt-2">
            <Sidebar />
            <div className="flex flex-col w-full pb-2">
              <Header isOverlay={isOverlay} setIsOverlay={setIsOverlay} />
              {children}
            </div>
          </div>
          {/* Overlay */}
          {isOverlay && <span className="absolute bg-black/60 w-full min-h-full top-0"></span>}
        </div>
      )}
    </div>
  );
}
