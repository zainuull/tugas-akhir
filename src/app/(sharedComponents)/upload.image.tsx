'use client';
import { GoUpload } from 'react-icons/go';
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import React, { useState } from 'react';
import { NotifyService } from '@/core/services/notify/notifyService';

interface IUploadImage {
  imageUrl: string;
  setImageUrl: Function;
}

export const UploadImage = (props: IUploadImage) => {
  const { imageUrl, setImageUrl } = props;
  const [publicId, setPublicId] = useState('');
  const notifyService = new NotifyService();

  const handleUploadImage = (res: CloudinaryUploadWidgetResults) => {
    const info = res.info as object;

    if ('secure_url' in info && 'public_id' in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;
      setPublicId(public_id);
      setImageUrl(url);
    }
  };

  const handleDeleteImage = async (e: React.FormEvent) => {
    e.preventDefault();
    notifyService.confirmationDelete().then(async (res) => {
      if (res) {
        try {
          const res = await fetch(`/api/delete-image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicId }),
          });
          if (res.ok) {
            setImageUrl('');
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };


  return (
    <>
      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onUpload={handleUploadImage}
        className={`w-full h-16 bg-slate-100 flex items-center justify-center ${
          imageUrl && 'pointer-events-none'
        }`}>
        {!imageUrl && <GoUpload size={25} />}
        {imageUrl && <p className="text-xs">Name File {imageUrl.slice(0, 30)}</p>}
      </CldUploadButton>
      {imageUrl && (
        <button
          onClick={handleDeleteImage}
          className="bg-red-600 text-white py-2 text-sm rounded-lg w-[150px] hover:bg-red-700 transition-all mx-2">
          Delete Image
        </button>
      )}
    </>
  );
};
