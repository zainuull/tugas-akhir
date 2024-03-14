'use client';
import { useState } from 'react';
import ListCard from './(presentation)/(components)/list-card/list.card';
import DetailOrder from './(presentation)/(components)/order/order';
import ListFailed from './(presentation)/(components)/list-failed/list.card';
import Submit from './(presentation)/(components)/submit/submit';
import useUser from '@/core/services/store/store.user';
import { IDataOperatorModel } from '@/core/services/domain/model/region.model';

const DetailInjection = ({ params }: { params: { id: number } }) => {
  const [user] = useUser();
  const role = user.data?.privilege?.general_role || '';
  const [operatorSuccess, setOperatorSuccess] = useState<IDataOperatorModel>({
    id: 0,
    name: '',
  });
  const [operatorFailed, setOperatorFailed] = useState<IDataOperatorModel>({
    id: 0,
    name: '',
  });
  const [clientCredit, setClientCredit] = useState<boolean>(true);

  return (
    <main className="w-full grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-4">
      {/* Left */}
      <ListCard operator={operatorSuccess} setOperator={setOperatorSuccess} />
      {/* Right */}
      <div className="flex flex-col w-full gap-y-3 col-span-1">
        <DetailOrder clientCredit={clientCredit} role={role} />
        {role === 'admin' && <Submit />}
        {role !== 'admin' && (
          <ListFailed operator={operatorFailed} setOperator={setOperatorFailed} />
        )}
      </div>
    </main>
  );
};

export default DetailInjection;
