'use client';

import { useRouter } from "next/navigation";

const Card = ({ data, todayData }: { data: number; todayData: number }) => {
  const router = useRouter()

  const datas = [
    {
      title: 'Peserta Baru Terdaftar Hari Ini',
      value: todayData,
    },
    {
      title: 'Total Peserta',
      value: data,
    },
  ];

  const handleDetail = () => {
    router.push('/dashboard/participant-today')
  };

  return (
    <div className="w-full h-48 grid grid-cols-2 gap-5">
      {datas.map((data: any, idx: number) => (
        <div
          key={idx}
          onClick={idx === 0 ? handleDetail : undefined}
          className={`w-full h-full bg-white rounded-lg col-span-1 flex flex-col justify-center items-center gap-y-6 ${
            idx == 0 && 'cursor-pointer hover:scale-105 transition-all hover:shadow-md'
          }`}>
          <h1 className={`text-primary font-bold`}>{data.title}</h1>
          <span>
            <p className="text-4xl text-primary font-bold">{data.value.toLocaleString('id-ID')}</p>
            {/* {idx == 1 && <p className="text-green-600">+18.34%</p>} */}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Card;
