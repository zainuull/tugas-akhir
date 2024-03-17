import { IDataAdmin } from '@/core/services/domain/model/IParticipant';
import html2canvas from 'html2canvas';

const DetailBiodata = ({ data }: { data: IDataAdmin }) => {
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
      link.download = 'Biodata Admin.jpg';

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
                <p>Nama</p>
                <p>Email</p>
                <p>Role</p>
              </span>
              <span className="flex flex-col gap-y-2 truncate">
                <p>: {data.name}</p>
                <p>: {data.email}</p>
                <p>: {data.role}</p>
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
