import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useEffect, useState } from 'react';

export default function Picker({ selectedOption }: { selectedOption: string }) {
  const [value, setValue] = useState<dayjs.Dayjs | null>(null); // Initialize with null

  useEffect(() => {
    // Set the default value to the current date using dayjs when the component mounts
    setValue(dayjs());
  }, []);

  // Determine if the DateTimePicker should be disabled based on the selectedOption
  const isDisabled = selectedOption === 'Instant' || selectedOption === '';

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          label="Select Date"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          ampm={false} // Set 24-hour format
          disabled={isDisabled}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
