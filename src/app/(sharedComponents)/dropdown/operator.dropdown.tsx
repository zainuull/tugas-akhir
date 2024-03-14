'use client';
import Select from 'react-select';
import { IDataOperatorModel } from '@/core/services/domain/model/region.model';
import { useEffect } from 'react';
import VM from '@/core/services/vm/vm';

const OperatorDropdown = ({
  operator,
  setOperator,
}: {
  operator: IDataOperatorModel;
  setOperator: Function;
}) => {
  const { getOperator, providers } = VM();

  useEffect(() => {
    getOperator();
  }, []);

  const Option = providers?.data?.map((data: IDataOperatorModel) => ({
    value: data.id,
    label: data.name,
  }));


  const handle = (option: any) => {
    setOperator({
      id: option?.value,
      name: option?.label,
    });
  };

  return (
    <Select
      closeMenuOnSelect={true}
      options={Option}
      value={Option?.find((option) => option.label === operator?.name)}
      isClearable={true}
      isSearchable={true}
      onChange={handle}
      placeholder="Pilih Operator"
    />
  );
};

export default OperatorDropdown;
