import { IDataParticipant } from '@/app/(pages)/(admin)/participant-management/domain/model/model';
import foto from '/public/assets/proofPayment.png';
import Image from 'next/image';

const Photo = ({ data }: { data: IDataParticipant }) => {
  return (
    <div className="w-full h-full col-span-2">
      <div className="w-full h-full xl:h-4/5 bg-white rounded-lg flex items-center justify-center">
        {data.image_url ? (
          <Image src={foto} alt="" className="w-full h-full" />
        ) : (
          <p className="text-center text-xl text-gray-400">Not have the photo</p>
        )}
      </div>
    </div>
  );
};

export default Photo;
