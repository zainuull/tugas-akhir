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
      <Card data={data} />
      <div className="bg-white h-full flex flex-col justify-center items-center">
        <span className="w-full flex flex-col xl:flex-row items-center justify-between xl:px-12 my-5">
          <h1 className="xl:text-xl font-semibold uppercase">
            Total Peserta Berdasarkan Masa Perlindungan
          </h1>
          <h1 className="text-xs xl:text-sm text-gray-500">
            Terakhir Update: 19 Feb 2024 19:00 WIB
          </h1>
        </span>
        <HorizontalBars data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
