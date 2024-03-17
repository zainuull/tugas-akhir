import { IDataParticipant } from '@/core/services/domain/model/IParticipant';
import Image from 'next/image';

const Photo = ({ data }: { data: IDataParticipant }) => {
  return (
    <div className="w-full h-full col-span-2">
      <div className="w-full h-full xl:h-4/5 bg-white rounded-lg flex items-center justify-center">
        {data.image ? (
          <Image src={data.image} alt={data.name} className="w-full h-full object-cover" width={200} height={200}/>
        ) : (
          <p className="text-center text-xl text-gray-400">Not have the photo</p>
        )}
      </div>
    </div>
  );
};

export default Photo;
