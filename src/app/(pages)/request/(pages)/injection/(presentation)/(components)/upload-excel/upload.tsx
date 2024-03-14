'use client';
import { GoUpload } from 'react-icons/go';
import Papa from 'papaparse';
import { useRef, useState } from 'react';


interface IUpload {
  setData: Function;
}

interface MyData {}

export const Upload = (props: IUpload) => {
  const { setData } = props;
  // const { verifyFile, downloadTemplateCSV } = VM();
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          if (Array.isArray(results.data)) {
            setData(results.data as MyData[]);
          }
        },
      });
    }
  };

  const handleDownload = () => {
    // downloadTemplateCSV();
  };

  const handleDelete = () => {
    setData([]);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input element
    }
  };

  //with xlsx
  // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target?.files?.[0]; // Use optional chaining to prevent null error
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const binaryString = event.target?.result as string; // Use optional chaining
  //       if (binaryString) {
  //         const workbook = XLSX.read(binaryString, { type: 'binary' });
  //         const firstSheetName = workbook.SheetNames[0];
  //         const worksheet = workbook.Sheets[firstSheetName];
  //         const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  //         setData(parsedData as MyData[]); // Assuming parsedData is an array of MyData
  //       }
  //     };
  //     reader.readAsBinaryString(file);
  //   }
  // };

  return (
    <div className="w-full flex flex-col gap-y-2">
      <div
        id="upload-payment-wrapper"
        className="w-full bg-gray-100 h-56 flex flex-col justify-center items-center gap-y-1">
        <label
          htmlFor="upload-payment"
          className="cursor-pointer hover:scale-105 duration-200 transition-all">
          <GoUpload size={40} />
        </label>
        <input
          type="file"
          id="upload-payment"
          accept=".csv"
          onChange={(e) => handleFileUpload(e)}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <p className="text-xs">
          {fileName ? (
            <p className="font-bold text-lg">{fileName}</p>
          ) : (
            <>
              Klik untuk Upload File <span className="text-gray-400">or drag & drop</span>
            </>
          )}
        </p>
        <span className="text-red-400 text-xs">Max upload 500 row. CSV / XLSX file required!</span>
        <span className="text-red-400 text-xs">
          Download
          <button
            onClick={handleDownload}
            className="text-red-500 cursor-pointer font-semibold hover:text-red-600 transition-all">
            TEMPLATE
          </button>{' '}
          here.
        </span>
      </div>
      {fileName && (
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white rounded-lg py-2 hover:bg-red-700 transition-all">
          Hapus
        </button>
      )}
    </div>
  );
};
