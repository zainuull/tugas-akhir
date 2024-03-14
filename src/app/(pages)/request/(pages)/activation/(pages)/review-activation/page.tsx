'use client';
import { useState } from 'react';
import ListCard from './(presentation)/(components)/list-card/list.card';
import UploadExcel from './(presentation)/(components)/upload-excel/upload.excel';
import Submit from './(presentation)/(components)/upload-excel/submit';
import {
  IDataEndUserModel,
  IDataOperatorModel,
  IDataRegionModel,
} from '@/core/services/domain/model/region.model';
import useUser from '@/core/services/store/store.user';
import { IDataRequestActivationModel } from '../../domain/model/model';
import DetailOrder from './(presentation)/(components)/detail-order/detail.order';

const ReviewRequestActivation = () => {
  const [user] = useUser();
  const role = user.data?.privilege?.general_role || '';
  const [operator, setOperator] = useState<IDataOperatorModel>({
    id: 0,
    name: '',
  });
  const [endUser, setEndUser] = useState<IDataEndUserModel>({
    id: 0,
    name: '',
  });
  const [region, setRegion] = useState<IDataRegionModel>({
    id: 0,
    name: '',
  });
  const [client, setClient] = useState<IDataEndUserModel>({
    id: 0,
    name: '',
  });
  const [data, setData] = useState<IDataRequestActivationModel[]>([]);

  return (
    <main className="w-full grid grid-cols-1 xl:grid-cols-5 gap-4">
      {/* Right */}
      <ListCard
        operator={operator}
        setOperator={setOperator}
        data={data}
        role={role}
        client={client}
        setClient={setClient}
      />
      {/* Left */}
      <div className="flex flex-col w-full gap-y-3 col-span-2">
        {/* Upload Excel */}
        <UploadExcel operator={operator} setData={setData} />
        {/* Detail Order */}
        <DetailOrder />
        <Submit
          data={data}
          operator={operator}
          endUser={endUser}
          region={region}
          client={client}
          role={role}
        />
      </div>
    </main>
  );
};

export default ReviewRequestActivation;
