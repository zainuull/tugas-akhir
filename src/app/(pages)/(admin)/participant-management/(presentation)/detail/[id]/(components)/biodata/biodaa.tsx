
import { IDataParticipant } from '@/core/services/domain/model/IParticipant';
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
      <div id="registerContent" className="w-full bg-white p-4 rounded-lg">
        {data ? (
          <>
            <h1 className="font-semibold text-lg">Biodata ID: {data.id}</h1>
            <span className="flex gap-x-3 text-sm mt-4">
              <span className="flex flex-col gap-y-2 truncate pb-4">
                <p>NIK</p>
                <p>Nama</p>
                <p>Tempat Lahir</p>
                <p>Tanggal Lahir</p>
                <p>Ibu Kandung</p>
                <p>Pekerjaan</p>
                <p>Periode Perlindungan</p>
                <p>Terdaftar Pada</p>
              </span>
              <span className="flex flex-col gap-y-2 truncate">
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
          </>
        ) : (
          <p className="w-full h-full text-center text-xl text-gray-400 my-20">Not have the data</p>
        )}
      </div>
      <button onClick={convertToJpgAndDownload} className="button w-1/2">
        Download
      </button>
    </>
  );
};

export default DetailBiodata;
