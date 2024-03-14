'use client';
import { useState } from 'react';
import CreditDropdown from '../dropdown/credit.dropdown';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Picker from './picker';

const Credit = ({ operator }: { operator: string }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleChange = (label: string) => {
    setSelectedOption(label === selectedOption ? null : label);
  };

  return (
    <div className="w-full min-h-52 bg-white rounded-lg p-4">
      {operator ? (
        <div className="w-full flex flex-col gap-y-6">
          {/* Credit */}
          <span className="col-span-1">
            <p>Credit</p>
            <CreditDropdown />
          </span>
          {/* Injection Time */}
          <span className="col-span-1">
            <p>Injection Time</p>
            {/* Instant */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOption === 'Instant'}
                  onChange={() => handleChange('Instant')}
                  inputProps={{ 'aria-label': 'Instant' }}
                />
              }
              label="Instant"
            />
            {/* Scheduled */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedOption === 'Scheduled'}
                  onChange={() => handleChange('Scheduled')}
                  inputProps={{ 'aria-label': 'Scheduled' }}
                />
              }
              label="Scheduled"
            />
            <Picker selectedOption={selectedOption || ''} />
          </span>
        </div>
      ) : (
        <p className="w-full h-full text-center text-xl text-gray-400 my-20">
          Choose your operator{' '}
        </p>
      )}
    </div>
  );
};
export default Credit;
