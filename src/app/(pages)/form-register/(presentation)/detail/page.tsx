'use client';
import DetailBiodata from './(components)/biodata/biodaa';
import useStoreDatas from '../store/store';

const DetailParticipant = () => {
  const [data] = useStoreDatas();
  return (
    <main className="w-full h-screen bg-secondary p-4 flex items-center justify-center select-none">
      <DetailBiodata data={data} />
    </main>
  );
};

export default DetailParticipant;
