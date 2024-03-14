'use client';
import Select from 'react-select';
import { IDataRegionModel } from '@/core/services/domain/model/region.model';
import { useEffect } from 'react';
import VM from '@/core/services/vm/vm';

const RegionDropdown = ({ value, setValue }: { value: IDataRegionModel; setValue: Function }) => {
  const { getRegion, region } = VM();

  useEffect(() => {
    getRegion();
  }, []);

  const Option = region?.data?.map((data: IDataRegionModel) => ({
    value: data.id,
    label: data.name,
  }));

  const handle = (option: any) => {
    setValue({
      id: option?.value,
      name: option?.label,
    });
  };

  return (
    <Select
      closeMenuOnSelect={true}
      options={Option}
      value={Option?.find((option) => option.label === value?.name)}
      isClearable={true}
      isSearchable={true}
      onChange={handle}
      placeholder="Pilih Region"
    />
  );
};

export default RegionDropdown;
