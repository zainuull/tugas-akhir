'use client';
import { useState } from 'react';
import { IRequestCreditDataModel } from '../../domain/model/model';
import { NotifyService } from '@/core/services/notify/notifyService';
import { useRouter } from 'next/navigation';
// Icons
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import OperatorDropdown from '@/app/(sharedComponents)/dropdown/operator.dropdown';
import { IDataEndUserModel, IDataOperatorModel } from '@/core/services/domain/model/region.model';
import ClientDropdown from './dropdown/client.dropdown';
import SubmitAdmin from './submit-admin/submit.admin';
import useStoreDatas, { IStoreDatas } from '../store/store.datas';

interface IOperator {
  operator: IDataOperatorModel;
  setOperator: Function;
  client: IDataEndUserModel;
  setClient: Function;
  role: string;
  file: File[];
  dataCredit: IRequestCreditDataModel[];
}

export interface CountsState {
  [id: number]: number;
}

const Operator = (props: IOperator) => {
  const { operator, setOperator, client, setClient, role, file, dataCredit } = props;
  const [, setDatas] = useStoreDatas();
  const [counts, setCounts] = useState<CountsState>({});
  const notifyService = new NotifyService();
  const router = useRouter();

  const handleIncrement = (id: number) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1, // Increment count for the specific id
    }));
  };

  const handleDecrement = (id: number) => {
    if (counts[id] && counts[id] > 0) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [id]: prevCounts[id] - 1, // Decrement count for the specific id
      }));
    }
  };

  const handleInputChange = (id: number, value: string) => {
    const newValue = parseInt(value);
    if (!isNaN(newValue) && newValue >= 0) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [id]: newValue, // Update count for the specific id based on input value
      }));
    }
  };

  const totalPrice = () =>
    Object.entries(counts).reduce(
      (acc, [id, count]) =>
        acc + (dataCredit.find((data) => data.id === parseInt(id))?.price || 0) * count,
      0
    );

  const handleSubmit = () => {
    const quotaArray = Object.keys(counts)
      .map((id) => {
        const numericId = parseInt(id);
        const count = counts[numericId];
        const item = dataCredit.find((data) => data.id === numericId);
        const valueMb = item?.value_mb || 0;
        const price = item?.price || 0;
        const totalPrice = price * count;
        return {
          id: numericId,
          value_mb: valueMb,
          total_count: count,
          price: price,
          total_price: totalPrice,
        };
      })
      .filter((entry) => entry.total_count !== 0);

    const payload: IStoreDatas = {
      operator: operator,
      quota: quotaArray,
      total_price: totalPrice(),
    };

    notifyService.confirmationCreate().then((res) => {
      if (res) {
        setDatas(payload);
        console.log('payload', payload);
        router.push('/request/credit/payment');
      }
    });
  };

  return (
    <div className="w-full xl:w-[55%] bg-white flex flex-col p-4 rounded-lg gap-y-4">
      <div className="flex items-center gap-x-6">
        {role === 'admin' && (
          <span className="w-full text-sm">
            <p>Client</p>
            <ClientDropdown setClient={setClient} client={client} />
          </span>
        )}
        <span className="w-full text-sm">
          <p>Operator</p>
          <OperatorDropdown operator={operator} setOperator={setOperator} />
        </span>
      </div>
      <div className="w-full flex flex-col gap-y-4 mt-4 min-h-72">
        <p>Credit Denomination</p>
        {operator && <p className="text-gray-500 text-sm -mt-2">{operator.name} (20 cards)</p>}
        {operator.id ? (
          <>
            {dataCredit.map((data: IRequestCreditDataModel) => (
              <div
                key={data.id}
                className="w-full bg-primary h-12 rounded-lg flex justify-between items-center text-white px-4 text-sm">
                <h1>{data.value_mb} MB</h1>
                <div className="flex items-center gap-x-2 select-none">
                  <h1>Rp. {data.price?.toLocaleString('id-ID')}</h1>
                  {/* Count */}
                  <span className="flex items-center justify-center min-w-20">
                    <button onClick={() => handleIncrement(data?.id || 0)}>
                      <CiCirclePlus size={18} />
                    </button>
                    <input
                      value={counts[data.id || 0] || 0}
                      onChange={(e) => handleInputChange(data?.id || 0, e.target.value || '0')}
                      className="w-12 outline-none px-1 text-white text-center bg-transparent"
                      maxLength={4}
                    />
                    <button onClick={() => handleDecrement(data?.id || 0)}>
                      <CiCircleMinus size={18} />
                    </button>
                  </span>
                </div>
              </div>
            ))}
            <div className="w-full flex items-center justify-between mt-8">
              <span>
                <p>Total Price</p>
                <h1 className="font-semibold text-primary">
                  Rp. {totalPrice().toLocaleString('id-ID')}
                </h1>
              </span>
              {role === 'admin' ? (
                <SubmitAdmin
                  client={client}
                  counts={counts}
                  totalPrice={totalPrice}
                  operator={operator}
                  file={file}
                  dataCredit={dataCredit}
                />
              ) : (
                <button
                  onClick={handleSubmit}
                  className={`px-6 py-2 rounded-lg ${
                    Object.values(counts).some((count) => count > 0)
                      ? 'bg-primary'
                      : 'bg-gray-400 cursor-not-allowed'
                  } text-white`}
                  disabled={!Object.values(counts).some((count) => count > 0)}>
                  Send Request
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="w-full h-full text-center text-xl text-gray-400 my-20">
            Choose your operator{' '}
          </p>
        )}
      </div>
    </div>
  );
};

export default Operator;
