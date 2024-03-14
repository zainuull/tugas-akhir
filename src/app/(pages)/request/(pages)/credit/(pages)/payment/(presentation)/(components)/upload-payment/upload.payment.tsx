'use client';
import { useState } from 'react';
import { Photo } from './photo';
import Rekening from './rekening';
import Submit from './submit';

const UploadPayment = () => {
  const [uploadedFile, setUploadedFile] = useState<File[]>([]);
  return (
    <div className="w-full xl:w-[45%] flex flex-col gap-y-3">
      <Rekening />
      <div className="w-full bg-white rounded-lg flex flex-col gap-y-2 items-center p-4">
        <h1>Upload Proof of Payment</h1>
        <Photo upload={setUploadedFile} files={uploadedFile} />
        <Submit file={uploadedFile} />
      </div>
    </div>
  );
};

export default UploadPayment;
