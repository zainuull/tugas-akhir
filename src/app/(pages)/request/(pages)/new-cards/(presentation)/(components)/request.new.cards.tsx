'use client';
import { useState } from 'react';
import NumberOfCards from './number.of.cards';
import Submit from './submit';
import Operator from './operator';
import OperatorDropdown from '@/app/(sharedComponents)/dropdown/operator.dropdown';
import { IDataEndUserModel, IDataOperatorModel } from '@/core/services/domain/model/region.model';
import ClientDropdown from '../../../credit/(presentation)/(components)/dropdown/client.dropdown';

export interface ICounts {
  [id: string]: number;
}

const RequestNewCards = ({ role }: { role: string }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [counts, setCounts] = useState<ICounts>({});
  const [client, setClient] = useState<IDataEndUserModel>({
    id: 0,
    name: '',
  });

  return (
    <div className="w-full xl:w-[55%] min-h-40 bg-white flex flex-col rounded-lg gap-y-4 pb-5">
      {/* Operator */}
      <div className="px-4 mt-4 flex flex-col gap-y-4">
        {role === 'admin' && <ClientDropdown client={client} setClient={setClient} />}
        <Operator
          setCounts={setCounts}
          selectedOption={selectedOption || ''}
          setSelectedOption={setSelectedOption}
        />
      </div>
      {/* Number of cards */}
      <NumberOfCards counts={counts} setCounts={setCounts} selectedOption={selectedOption || ''} />
      {/* Submit */}
      <Submit counts={counts} selectedOption={selectedOption || ''} client={client} role={role}/>
    </div>
  );
};

export default RequestNewCards;
