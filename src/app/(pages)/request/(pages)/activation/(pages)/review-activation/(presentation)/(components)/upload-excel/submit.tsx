'use client';
import { NotifyService } from '@/core/services/notify/notifyService';
import { useRouter } from 'next/navigation';
import { IDataRequestActivationModel } from '../../../../../domain/model/model';
import {
  IDataEndUserModel,
  IDataOperatorModel,
  IDataRegionModel,
} from '@/core/services/domain/model/region.model';

interface ISubmit {
  data: IDataRequestActivationModel[];
  operator: IDataOperatorModel;
  endUser: IDataEndUserModel;
  region: IDataRegionModel;
  client: IDataEndUserModel;
  role: string;
}

interface IPayload {
  operator_id: number | undefined;
  file: IDataRequestActivationModel[];
  end_user: IDataEndUserModel;
  region: IDataRegionModel;
  client?: IDataEndUserModel;
}

const Submit = (props: ISubmit) => {
  const { data, operator, endUser, region, client, role } = props;
  const notifyService = new NotifyService();
  const router = useRouter();

  const createAction = () => {
    let payload: IPayload = {
      operator_id: operator.id,
      file: data,
      end_user: endUser,
      region: region,
    };

    if (role === 'admin') {
      payload = {
        ...payload,
        client: client,
      };
    }

    notifyService.confirmationCreate().then((res) => {
      if (res) {
        console.log('payload', payload);
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
      <button onClick={createAction} className="button w-full">
        Accept Request
      </button>
      <button onClick={handleInject} className="inject-button w-full">
        Inject Request
      </button>
    </div>
  );
};

export default Submit;
