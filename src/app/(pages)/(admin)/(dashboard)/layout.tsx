import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import 'react-toastify/dist/ReactToastify.css';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const metadata: Metadata = {
  title: 'Dashboard Tugas Akhir',
  description: 'This created tugas akhir',
  authors: [{ name: 'Tugas Akhir' }, { url: 'https://tugas-akhir-roan.vercel.app/' }],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return <>{children}</>;
}
