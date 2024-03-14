'use client';
import { useState } from 'react';
import ListCard from './(presentation)/(components)/list-card/list.card';
import DetailOrder from './(presentation)/(components)/order/order';
import Submit from './(presentation)/(components)/submit/submit';
import useUser from '@/core/services/store/store.user';
import { IDataOperatorModel } from '@/core/services/domain/model/region.model';

const DetailActivation = ({ params }: { params: { id: number } }) => {
  const [user] = useUser();
  const role = user.data?.privilege?.general_role;
  const [operator, setOperator] = useState<IDataOperatorModel>({
    id: 0,
    name: '',
  });

  return (
    <main className="w-full grid grid-cols-1 xl:grid-cols-5 gap-4">
      {/* Right */}
      <ListCard operator={operator} setOperator={setOperator} />
      {/* Left */}
      <div className="flex flex-col w-full gap-y-3 col-span-2">
        {/* Detail Order */}
        <DetailOrder />
        {role === 'admin' && <Submit />}
      </div>
    </main>
  );
};

export default DetailActivation;
