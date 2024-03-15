'use client';
import { useState } from 'react';
import Dashboard from './(pages)/dashboard/page';
import Header from './(sharedComponents)/header';
import Sidebar from './(sharedComponents)/sidebar';

export default function Home() {
  const [isNotif, setIsNotif] = useState<boolean>(false);

  return (
    <main className="bg-secondary w-full h-screen overflow-y-scroll">
      <div className="relative">
        <div className="w-full min-h-[100vh] flex gap-x-4 px-4 pt-2">
          <Sidebar />
          <div className="flex flex-col w-full pb-2">
            <Header isOverlay={isNotif} setIsOverlay={setIsNotif} />
            <Dashboard />
          </div>
        </div>
        {/* Overlay */}
        {isNotif && <span className="absolute bg-black/60 w-full min-h-full top-0"></span>}
      </div>
    </main>
  );
}
