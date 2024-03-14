'use client';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const OperatorDropdown = ({
  operator,
  setOperator,
}: {
  operator: string[];
  setOperator: Function;
}) => {
  const animatedComponents = makeAnimated();

  const Option = [
    { value: 'Telkomsel', label: 'Telkomsel' },
    { value: 'XL', label: 'XL' },
    { value: 'IM3', label: 'IM3' },
    { value: '3', label: '3' },
    { value: 'Axis', label: 'Axis' },
  ];

  const handle = (selectedOptions: any) => {
    // Modified the handle function
    const selectedValues = selectedOptions
      ? selectedOptions.map((option: any) => option.label)
      : [];
    setOperator(selectedValues);
  };


  return (
    <Select
      closeMenuOnSelect={true}
      components={animatedComponents}
      options={Option}
      value={Option.filter((option) => operator.includes(option.label))}
      isClearable={true}
      isSearchable={true}
      onChange={handle}
      isMulti
      placeholder="Pilih Operator"
    />
  );
};

export default OperatorDropdown;
