'use client';
import { NotifyService } from '@/core/services/notify/notifyService';
import { useRouter } from 'next/navigation';
import {
  IDataEndUserModel,
  IDataRegionModel,
} from '@/core/services/domain/model/region.model';

interface IPayload {
  operator_id: number | undefined;
  end_user: IDataEndUserModel;
  region: IDataRegionModel;
  client?: IDataEndUserModel;
}

const Submit = () => {
  const notifyService = new NotifyService();
  const router = useRouter();

  const handleAccept = () => {
    notifyService.confirmationCreate().then((res) => {
      if (res) {
        console.log('payload');
        router.push('/dashboard');
      }
    });
  };

  const handleInject = () => {
    notifyService.confirmationInject().then((res) => {
      if (res) {
        router.push('/dashboard');
      }
    });
  };

  return (
    <div className="w-full flex items-center gap-x-2">
      <button onClick={handleAccept} className="button w-full">
        Accept Request
      </button>
      <button onClick={handleInject} className="inject-button w-full">
        Inject Request
      </button>
    </div>
  );
};

export default Submit;
