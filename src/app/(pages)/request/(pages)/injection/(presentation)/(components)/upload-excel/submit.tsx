'use client';
import { NotifyService } from '@/core/services/notify/notifyService';
import { useRouter } from 'next/navigation';
import { IData } from '../../../domain/model/model';
import { IDataCreditModel, IDataOperatorModel } from '@/core/services/domain/model/region.model';
import dayjs from 'dayjs';

interface ISubmit {
  data: IData[];
  operator: IDataOperatorModel;
  credit: IDataCreditModel;
  selectedOption: string;
  timePicker: dayjs.Dayjs | null;
  role: string;
  clientCredit: boolean;
}

interface IPayload {
  operator_id: number | undefined;
  file: IData[];
  credit: IDataCreditModel;
  selectedOption: string;
  timePicker: string;
  clientCredit?: boolean;
}

const Submit = (props: ISubmit) => {
  const { data, operator, credit, selectedOption, timePicker, role, clientCredit } = props;
  const notifyService = new NotifyService();
  const router = useRouter();

  const createAction = () => {
    const dateTimeFormat = 'YYYY-MM-DD HH:mm';
    let dateTimePart;
    if (selectedOption === 'Instant') {
      dateTimePart = dayjs().format(dateTimeFormat);
    } else {
      dateTimePart = timePicker ? timePicker.format(dateTimeFormat) : '';
    }

    let payload: IPayload = {
      operator_id: operator.id,
      file: data,
      credit: credit,
      selectedOption: selectedOption,
      timePicker: dateTimePart,
    };

    if (role === 'admin') {
      payload = {
        ...payload,
        clientCredit: clientCredit,
      };
    }

    notifyService.confirmationCreate().then((res) => {
      if (res) {
        console.log('payload', payload);
        router.push('/history/injection');
      }
    });
  };

  return (
    <button
      onClick={createAction}
      className={`${data?.length ? 'button' : 'disabled-button'}`}
      disabled={!data?.length}>
      Send Request
    </button>
  );
};

export default Submit;
