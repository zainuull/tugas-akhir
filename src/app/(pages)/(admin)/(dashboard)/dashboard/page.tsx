'use client';
import VM from '@/core/services/vm/vm';
import Card from './(presentation)/(components)/card';
import HorizontalBars from './(presentation)/(components)/chart';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { HandleError } from '@/core/services/handleError/handleError';
import { NotifyService } from '@/core/services/notify/notifyService';

const Dashboard = () => {
  const { getData, datas } = VM();
  const data = datas?.data || [];
  const notifyService = new NotifyService();

  // Filtering data based on created_at field matching the current date
  const todayData = data.filter((item) => item.isPaid);

  const latestObject = data?.reduce(
    (prev, current) => (new Date(current.created_at) > new Date(prev.created_at) ? current : prev),
    data[0]
  );

  useEffect(() => {
    notifyService.showLoading();
    fetchData();
  }, []);

  const fetchData = () => {
    getData()
      .then(() => {
        Swal.close();
      })
      .catch((err) => {
        HandleError(err);
      });
  };

  return (
    <div className="w-full h-full grid grid-cols-1">
      <Card data={data.length} todayData={todayData.length} />
      <div className="bg-white h-full flex flex-col justify-center items-center">
        <span className="w-full flex flex-col xl:flex-row items-center justify-between xl:px-12 my-5">
          <h1 className="xl:text-xl font-semibold uppercase">
            Total Peserta Berdasarkan Masa Perlindungan
          </h1>
          <h1 className="text-xs xl:text-sm text-gray-500">
            Terakhir Update: {latestObject?.created_at}
          </h1>
        </span>
        <HorizontalBars data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
