'use client';
import { NotifyService } from '@/core/services/notify/notifyService';
import { useRouter } from 'next/navigation';
import { ICounts } from './request.new.cards';
import { IDataEndUserModel } from '@/core/services/domain/model/region.model';

interface ISubmit {
  counts: ICounts;
  selectedOption: string;
  client: IDataEndUserModel;
  role: string;
}

interface IPayload {
  operator: string;
  total_cards: number;
  client?: IDataEndUserModel;
}

const Submit = (props: ISubmit) => {
  const { counts, selectedOption, client, role } = props;
  const notifyService = new NotifyService();
  const router = useRouter();

  const handleSubmit = () => {
    // Calculate total cards
    let totalCards = 0;

    for (const key in counts) {
      if (Object.prototype.hasOwnProperty.call(counts, key)) {
        totalCards += counts[key];
      }
    }

    let payload: IPayload = {
      operator: selectedOption,
      total_cards: totalCards,
    };

    if (role == 'admin') {
      payload = {
        ...payload,
        client: client,
      };
    }

    notifyService.confirmationCreate().then((res) => {
      if (res) {
        console.log('payload', payload);
        router.push('/history/new-cards');
      }
    });
  };

  return (
    <span className="w-full text-end px-4">
      <button
        onClick={handleSubmit}
        className={`px-6 py-2 rounded-lg w-48 ${
          Object.values(counts).some((count) => count > 0)
            ? 'bg-primary'
            : 'bg-gray-400 cursor-not-allowed'
        } text-white`}
        disabled={!Object.values(counts).some((count) => count > 0)}>
        Send Request
      </button>
    </span>
  );
};

export default Submit;
