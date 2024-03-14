'use client';
import { NotifyService } from '@/core/services/notify/notifyService';
import { useRouter } from 'next/navigation';
import { IDataRequestActivationModel } from '../../../domain/model/model';
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
      end_user: endUser || '',
      region: region || '',
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
        router.push('/history/activation');
      }
    });
  };

  return (
    <button
      onClick={createAction}
      className={`${data.length ? 'button' : 'disabled-button'}`}
      disabled={!data.length}>
      Send Request
    </button>
  );
};

export default Submit;
