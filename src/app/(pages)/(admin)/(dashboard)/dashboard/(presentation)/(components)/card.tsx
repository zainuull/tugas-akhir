import { IDataParticipant } from '@/core/services/domain/model/IParticipant';

const Card = ({ data, todayData }: { data: number; todayData: number }) => {
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

  return (
    <div className="w-full h-48 grid grid-cols-2 gap-5">
      {datas.map((data: any, idx: number) => (
        <div
          key={idx}
          className={`w-full h-full bg-white rounded-lg col-span-1 flex flex-col justify-center items-center gap-y-6`}>
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
