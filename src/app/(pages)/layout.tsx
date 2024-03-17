'use client';
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';

const RootLayput = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
};

export default RootLayput;
