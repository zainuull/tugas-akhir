'use client';
import React, { useEffect, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IDataRegionModel } from '@/core/services/domain/model/region.model';
import VM from '@/core/services/vm/vm';

const SetRegionDropdown = ({
  value,
  setValue,
}: {
  value: IDataRegionModel;
  setValue: Function;
}) => {
  const { getRegion, region } = VM();
  const [checked, setChecked] = useState<boolean>();
  const regionData = region?.data || [];
  console.log(regionData);

  useEffect(() => {
    if (!checked) {
      setValue(null);
    } else {
      getRegion();
    }
  }, [checked]);

  const data = {
    options: regionData.map((item: IDataRegionModel) => ({
      id: item.id,
      name: item.name || '',
    })),
    getOptionLabel: (option: IDataRegionModel) => option.name || '',
  };

  console.log(data.options);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <span>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Set Region"
      />
      <Autocomplete
        {...data}
        id="controlled-demo"
        className="w-44"
        value={value}
        disabled={!checked}
        onChange={(event: any, newValue: IDataRegionModel | null) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label={`${checked ? 'Region' : 'Disabled'}`} variant="standard" />
        )}
      />
      <p className="text-[8px] mt-2">
        To add more region, access to <button className="underline">region management page</button>
      </p>
    </span>
  );
};

export default SetRegionDropdown;
