'use client';
import DetailBiodata from './(components)/biodata/biodaa';
import VM from '../../vm/vm';
import Swal from 'sweetalert2';
import { HandleError } from '@/core/services/handleError/handleError';
import { useEffect } from 'react';
import { NotifyService } from '@/core/services/notify/notifyService';
import Photo from './(components)/photo/photo';

const DetailParticipant = ({ params }: { params: { id: string } }) => {
  const { getDataById, dataById } = VM();
  const data = dataById?.data || {};
  const notifyService = new NotifyService();

  useEffect(() => {
    notifyService.showLoading();
    fetchData();
  }, []);

  const fetchData = () => {
    getDataById(params.id)
      .then(() => {
        Swal.close();
      })
      .catch((err) => {
        HandleError(err);
      });
  };

  return (
    <main className="w-full h-full grid grid-cols-1 xl:grid-cols-4 gap-4">
      {/* Right */}
      <Photo data={data} />
      {/* Left */}
      <div className="flex flex-col w-full gap-y-3 col-span-2">
        {/* Biodata */}
        <DetailBiodata data={data} />
      </div>
    </main>
  );
};

export default DetailParticipant;
