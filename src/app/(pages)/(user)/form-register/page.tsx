import { Metadata } from 'next';
import CreateUser from './(presentation)/create/create';

export const metadata: Metadata = {
  title: 'Form Register Tugas Akhir',
  description: 'This created tugas akhir',
  authors: [{ name: 'Tugas Akhir' }, { url: 'https://tugas-akhir-roan.vercel.app/' }],
  // icons: {
  //   icon: '/logo.png',
  // },
};

const RegisterPage = () => {
  return (
    <div className="w-full h-screen bg-secondary p-4 flex items-center justify-center select-none">
      <CreateUser />
    </div>
  );
};

export default RegisterPage;
