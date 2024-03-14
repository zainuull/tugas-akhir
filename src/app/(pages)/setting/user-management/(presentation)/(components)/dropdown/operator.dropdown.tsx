'use client';
import Select from 'react-select';

const OperatorDropdown = ({
  operator,
  setOperator,
}: {
  operator: string;
  setOperator: Function;
}) => {
  const Option = [
    { value: 'Telkomsel', label: 'Telkomsel' },
    { value: 'XL', label: 'XL' },
    { value: 'IM3', label: 'IM3' },
    { value: '3', label: '3' },
    { value: 'Axis', label: 'Axis' },
  ];

  const handle = (option: any) => {
    setOperator(option?.label);
  };


  return (
    <Select
      closeMenuOnSelect={true}
      options={Option}
      value={Option.find((option) => option.label === operator) || ''}
      isClearable={true}
      isSearchable={true}
      onChange={handle}
      placeholder="Pilih Operator"
    />
  );
};

export default OperatorDropdown;
