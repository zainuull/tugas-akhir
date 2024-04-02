import { IDataParticipant } from '@/core/services/domain/model/IParticipant';
import ToastNotify from '@/core/services/notify/toast';
import html2canvas from 'html2canvas';

const DetailBiodata = ({ data }: { data: IDataParticipant }) => {
  const convertToJpgAndDownload = async () => {
    try {
      const content = document.getElementById('registerContent');

      // Create a canvas from the content
      const canvas = await html2canvas(content!);

      // Convert canvas to image data URL
      const imageData = canvas.toDataURL('image/jpeg');

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = imageData;
      link.download = 'Biodata.jpg';

      // Simulate a click to trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error converting to JPG:', error);
    }
  };

  return (
    <>
      {data ? (
        <div className="flex flex-col w-full h-full justify-center items-center">
          <div
            id="registerContent"
            className="w-full xl:w-2/5  bg-white rounded-lg flex flex-col gap-y-3 px-2 xl:px-4 pt-2">
            <h1 className="text-primary font-semibold w-full text-center underline">
              Bukti Registrasi
            </h1>
            <div className="flex gap-x-3 text-sm mt-2">
              <div className="flex flex-col gap-y-4 font-semibold truncate pb-5">
                <p>NIK</p>
                <p>Nama</p>
                <p>Tempat Lahir</p>
                <p>Tanggal Lahir</p>
                <p>Ibu Kandung</p>
                <p>Pekerjaan</p>
                <p>Periode Perlindungan</p>
                <p>No Antrian</p>
                <p>Waktu</p>
              </div>
              <div className="flex flex-col gap-y-4 truncate">
                <p>: {data.nik}</p>
                <p>: {data.name}</p>
                <p>: {data.place_of_birth}</p>
                <p>: {data.date_of_birth}</p>
                <p>: {data.biological_mother}</p>
                <p>: {data.work}</p>
                <p>: {data.protection_period}</p>

                <p>: {data.no_antrian}</p>
                <p>: {data.time}</p>
              </div>
            </div>
            <p className="w-full text-center text-xs pb-10">
              Silahkan datang sesuai no antrian ke kantor cabang bekasi cikarang
            </p>
          </div>
          <p className="text-[10px] xl:text-sm text-center my-4 font-semibold">
            Klik download dan tunjukan ke kantor BPJS Ketenagakerjaan cabang Bekasi Cikarang
          </p>
          <button onClick={convertToJpgAndDownload} className="button">
            Download
          </button>
        </div>
      ) : (
        <p className="w-full h-full text-center text-xl text-gray-400 my-20">Not have the data</p>
      )}
      <ToastNotify />
    </>
  );
};

export default DetailBiodata;
