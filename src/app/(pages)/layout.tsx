'use client';
import { SessionProvider } from 'next-auth/react';

const RootLayput = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
};

export default RootLayput;
