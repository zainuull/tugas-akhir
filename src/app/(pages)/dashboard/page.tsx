import { getServerSession } from 'next-auth';
import Card from './(presentation)/(components)/card';
import HorizontalBars from './(presentation)/(components)/chart';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect('/login');
  // }

  return (
    <div className="w-full h-full grid grid-cols-1">
      <Card />
      <div className="bg-white h-full flex flex-col justify-center items-center">
        <span className="w-full flex flex-col xl:flex-row items-center justify-between xl:px-12 my-5">
          <h1 className="xl:text-xl font-semibold">Data Penyebaran Peserta 2024</h1>
          <h1 className="text-xs xl:text-sm text-gray-500">
            Terakhir Update: 19 Feb 2024 19:00 WIB
          </h1>
        </span>
        <HorizontalBars />
      </div>
    </div>
  );
};

export default Dashboard;
