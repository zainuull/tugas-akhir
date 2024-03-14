'use client';
import { useState } from 'react';
import ListCard from './(presentation)/(components)/list-card/list.card';
import UploadExcel from './(presentation)/(components)/upload-excel/upload.excel';
import Submit from './(presentation)/(components)/upload-excel/submit';
import RemainingCredits from './(presentation)/(components)/remaining.credits';
import Credit from './(presentation)/(components)/credit/credit';

import { IDataCreditModel, IDataOperatorModel } from '@/core/services/domain/model/region.model';
import { IData } from './domain/model/model';
import dayjs from 'dayjs';
import useUser from '@/core/services/store/store.user';

const RequestInjection = () => {
  const [user] = useUser();
  const role = user.data?.privilege?.general_role || '';
  const [operator, setOperator] = useState<IDataOperatorModel>({
    id: 0,
    name: '',
  });
  const [credit, setCredit] = useState<IDataCreditModel>({
    id: 0,
    name: '',
  });
  const [clientCredit, setClientCredit] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [timePicker, setTimePicker] = useState<dayjs.Dayjs | null>(null);
  const [data, setData] = useState<IData[]>([]);

  return (
    <main className="w-full grid grid-cols-1 xl:grid-cols-5 gap-4">
      {/* Left */}
      <ListCard operator={operator} setOperator={setOperator} data={data} />
      {/* Right */}
      <div className="flex flex-col w-full gap-y-3 col-span-2">
        {/* Upload Excel */}
        <UploadExcel operator={operator} setData={setData} />
        <RemainingCredits operator={operator} />
        <Credit
          data={data}
          operator={operator}
          credit={credit}
          setCredit={setCredit}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          timePicker={timePicker}
          setTimePicker={setTimePicker}
          clientCredit={clientCredit}
          setClientCredit={setClientCredit}
          role={role}
        />
        <Submit
          data={data}
          operator={operator}
          credit={credit}
          selectedOption={selectedOption}
          timePicker={timePicker}
          role={role}
          clientCredit={clientCredit}
        />
      </div>
    </main>
  );
};

export default RequestInjection;
