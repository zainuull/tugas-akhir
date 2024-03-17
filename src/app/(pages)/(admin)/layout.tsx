'use client';
import Sidebar from '@/app/(sharedComponents)/sidebar';
import Header from '@/app/(sharedComponents)/header';
import useOverlay from './(dashboard)/store/store.notif';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOverlay, setIsOverlay] = useOverlay();

  return (
    <div className="bg-secondary w-full h-screen overflow-y-scroll">
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
    </div>
  );
}
