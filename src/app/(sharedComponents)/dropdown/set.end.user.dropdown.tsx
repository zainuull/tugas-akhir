'use client';
import React, { useEffect, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IDataEndUserModel } from '@/core/services/domain/model/region.model';
import VM from '@/core/services/vm/vm';

const SetEndUserDropdown = ({
  value,
  setValue,
}: {
  value: IDataEndUserModel;
  setValue: Function;
}) => {
  const { getEndUser, endUser } = VM();
  const [checked, setChecked] = useState<boolean>();
  const endUserData = endUser?.data || [];

  useEffect(() => {
    if (!checked) {
      setValue(null);
    } else {
      getEndUser();
    }
  }, [checked]);

  const data = {
    options: endUserData?.map((item: IDataEndUserModel) => ({
      id: item.id,
      name: item.name || '',
    })),
    getOptionLabel: (option: IDataEndUserModel) => option.name || '',
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <span>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Set End User"
      />
      <Autocomplete
        {...data}
        id="controlled-demo"
        className="w-44"
        value={value}
        disabled={!checked}
        onChange={(event: any, newValue: IDataEndUserModel | null) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label={`${checked ? 'Clients' : 'Disabled'}`} variant="standard" />
        )}
      />
      <p className="text-[8px] mt-2">
        To add more end users, access to{' '}
        <button className="underline">end user management page</button>
      </p>
    </span>
  );
};

export default SetEndUserDropdown;
