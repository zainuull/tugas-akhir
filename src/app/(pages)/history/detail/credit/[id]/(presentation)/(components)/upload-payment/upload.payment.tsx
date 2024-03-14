'use client';
import Rekening from './rekening';
import proofPayment from '/public/assets/proofPayment.png';
import Image from 'next/image';

const UploadPayment = () => {
  return (
    <div className="w-full xl:w-[45%] flex flex-col gap-y-3">
      <div className="w-full bg-white rounded-lg flex flex-col gap-y-2 items-center p-4">
        <h1>Proof of Payment</h1>
        <Image src={proofPayment} alt="" className="w-1/2" />
      </div>
    </div>
  );
};

export default UploadPayment;
