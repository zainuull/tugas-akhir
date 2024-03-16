import { IDataParticipant } from '@/app/(pages)/(admin)/participant-management/domain/model/model';

const DetailBiodata = ({ data }: { data: IDataParticipant }) => {
  return (
    <div className={`w-full xl:w-2/5 min-h-96 bg-white rounded-lg pb-8`}>
      {data ? (
        <div className="w-full flex flex-col gap-y-3 px-4 pt-2">
          <h1 className="text-primary font-semibold">Biodata ID: {data.id}</h1>
          <span className="flex gap-x-3 text-sm mt-4">
            <span className="flex flex-col gap-y-4 font-semibold">
              <p>NIK</p>
              <p>Nama</p>
              <p>Tempat Lahir</p>
              <p>Tanggal Lahir</p>
              <p>Ibu Kandung</p>
              <p>Pekerjaan</p>
              <p>Periode Perlindungan</p>
              <p>Terdaftar Pada</p>
            </span>
            <span className="flex flex-col gap-y-4">
              <p>: {data.nik}</p>
              <p>: {data.name}</p>
              <p>: {data.place_of_birth}</p>
              <p>: {data.date_of_birth}</p>
              <p>: {data.biological_mother}</p>
              <p>: {data.work}</p>
              <p>: {data.protection_period}</p>
              <p>: {data.created_at}</p>
            </span>
          </span>
        </div>
      ) : (
        <p className="w-full h-full text-center text-xl text-gray-400 my-20">Not have the data</p>
      )}
    </div>
  );
};

export default DetailBiodata;
