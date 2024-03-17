import { IDataParticipant } from '@/core/services/domain/model/IParticipant';

const Card = ({ data }: { data: IDataParticipant[] }) => {
  // Assuming currentDate is in the format 'YYYY-MM-DD'
  const currentDate = new Date().toISOString().split('T')[0];

  // Filtering data based on created_at field matching the current date
  const filteredData = data.filter((item) => item.created_at === currentDate);

  const lastUpdate = filteredData.map((data) => data.created_at);

  const datas = [
    {
      title: 'Peserta Baru Terdaftar Hari Ini',
      value: filteredData.length,
    },
    {
      title: 'Total Peserta',
      value: data.length,
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
