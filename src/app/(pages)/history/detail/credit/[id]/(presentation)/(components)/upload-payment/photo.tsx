'use client';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { GoUpload } from 'react-icons/go';
import Image from 'next/image';
// Icons
import { FaRegCircleXmark } from 'react-icons/fa6';
import Submit from './submit';

export const Photo = (props: any) => {
  const { upload, files } = props;
  const [uploadedFile, setUploadedFile] = useState<File[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string[]>([]);
  const [imgOpen, setImgOpen] = useState<string | any>();

  const clickImg = (url: string) => {
    setImgOpen(url);
  };

  const closeModal = () => {
    setImgOpen(null);
  };

  const deleteImg = (index: number) => {
    if (uploadedImage.length === 2) {
      setUploadedImage(uploadedImage.filter((_, idx) => idx != index));
      upload(uploadedFile.filter((_, idx) => idx != index));
      setUploadedFile(uploadedFile.filter((_, idx) => idx != index));
    } else {
      setUploadedImage([]);
      upload(null);
      setUploadedFile([]);
    }
  };

  const onDrop = (filesUpload: any) => {
    if (filesUpload.length) {
      upload(filesUpload);
      const strFile = filesUpload.map((f: File) => URL.createObjectURL(f));
      setUploadedImage(strFile);
    }
  };

  const { getRootProps, getInputProps, isDragAccept, isDragReject, open } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop,
  });

  const getContainerClass = () => {
    if (isDragAccept) {
      return 'border-green-400 bg-black/10';
    }
    if (isDragReject) {
      return 'border-red-700 bg-red/30';
    }
    return 'border-gray-700';
  };

  const handleSendPayment = () => {
    const payload = {};
  };

  return (
    <>
      {uploadedImage?.length ? (
        <div className="w-full gap-x-10">
          {uploadedImage.map((i, idx) => (
            <div key={idx} className="w-full relative flex flex-col justify-center items-center">
              <Image
                src={i}
                width={100}
                height={100}
                alt="Uploaded"
                onClick={() => clickImg(i)}
                className="h-[300px] w-[300px] rounded-lg border border-gray-700 object-cover hover:cursor-pointer hover:shadow-xl"
              />
              <button type="button" className="text-red-600" onClick={() => deleteImg(idx)}>
                Hapus
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className={`w-full flex flex-col gap-y-2  ${getContainerClass()}`}>
          <div
            id={'upload-payment'}
            onClick={open}
            className="w-full bg-gray-100 h-60 flex flex-col justify-center items-center gap-y-1">
            <GoUpload
              size={40}
              className="cursor-pointer hover:scale-105 duration-200 transition-all"
            />
            <input id={`input-payment`} {...getInputProps()} />
            <p className="text-xs">
              Klik untuk Upload Foto <span className="text-gray-400">or drag & drop</span>
            </p>
            <span className="text-gray-400 text-xs">(3 MB max file size)</span>
          </div>
        </div>
      )}

      {imgOpen && (
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-black/30">
          <div className="w-4/5 h-4/5 xl:w-1/2 xl:h-full z-10 py-4" onClick={closeModal}>
            <div className="w-full h-full relative">
              <div className="w-full h-full p-8 bg-white rounded-lg">
                <Image
                  width={100}
                  height={100}
                  src={imgOpen}
                  alt="detailPhoto"
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
              <FaRegCircleXmark
                onClick={closeModal}
                size={20}
                className="text-red-600 cursor-pointer absolute top-2 right-2"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
