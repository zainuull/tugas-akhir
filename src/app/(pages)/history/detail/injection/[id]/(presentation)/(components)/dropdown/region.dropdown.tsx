import { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import VM from '../../vm/vm';
import { IDataRegionModel } from '@/core/services/domain/model/region.model';

const RegionDropdown = ({}: {}) => {
  const { getRegion, region } = VM();
  const [value, setValue] = useState<string[]>([]);
  const animatedComponents = makeAnimated();

  useEffect(() => {
    getRegion();
  }, []);

  const Option = region?.data?.map((data: IDataRegionModel) => ({
    value: data.id,
    label: data.name,
  }));
  const handle = (selectedOptions: any) => {
    // Modified the handle function
    const selectedValues = selectedOptions
      ? selectedOptions.map((option: any) => option.label)
      : [];
    setValue(selectedValues);
  };

  return (
    <Select
      closeMenuOnSelect={true}
      components={animatedComponents}
      options={Option}
      value={Option?.filter((option) => value.includes(option?.label || ''))}
      isClearable={true}
      isSearchable={true}
      onChange={handle}
      isMulti
      placeholder="Pilih Wilayah"
    />
  );
};

export default RegionDropdown;
