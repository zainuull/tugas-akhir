'use client';
import React, { useEffect, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IDataRegionModel } from '@/core/services/domain/model/region.model';

const regionData = [{ id: 1, name: 'Jawa Barat' }];

interface IRegion {
  region: IDataRegionModel;
  setRegion: Function;
}

const RegionDropdown = (props: IRegion) => {
  const { region, setRegion } = props;
  const [checked, setChecked] = useState<boolean>();

  useEffect(() => {
    if (!checked) {
      setRegion(null);
    }
  }, [checked]);

  const data = {
    options: regionData,
    getOptionLabel: (option: IDataRegionModel) => option.name || '',
  };

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
        value={region}
        disabled={!checked}
        onChange={(event: any, newValue: IDataRegionModel | null) => {
          setRegion(newValue);
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

export default RegionDropdown;
