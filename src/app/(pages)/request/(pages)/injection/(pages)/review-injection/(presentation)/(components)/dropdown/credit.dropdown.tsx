'use client';
import Select from 'react-select';
import { mockData } from '../../../../../data/mock';
import { IRequestInjectionDataModel } from '../../../../../domain/model/model';
import { IDataCreditModel } from '@/core/services/domain/model/region.model';

const CreditDropdown = ({
  credit,
  setCredit,
}: {
  credit: IDataCreditModel;
  setCredit: Function;
}) => {
  const Option = mockData.map((data: IRequestInjectionDataModel) => ({
    value: data.id,
    label: data.quota,
  }));

  const handle = (option: any) => {
    setCredit(option?.label);
  };

  return (
    <Select
      closeMenuOnSelect={true}
      options={Option}
      value={Option.find((option) => option.label === credit?.name)}
      isClearable={true}
      isSearchable={true}
      onChange={handle}
      placeholder="Pilih Credit"
      className="z-10"
    />
  );
};

export default CreditDropdown;
