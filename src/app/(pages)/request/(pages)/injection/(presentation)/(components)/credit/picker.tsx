import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useEffect, useState } from 'react';
import { IData } from '../../../domain/model/model';

interface IPicker {
  data: IData[];
  selectedOption: string;
  timePicker: dayjs.Dayjs | null;
  setTimePicker: Function;
}

export default function Picker(props: IPicker) {
  const { selectedOption, timePicker, setTimePicker, data } = props;
  console.log(selectedOption);

  useEffect(() => {
    // Set the default value to the current date using dayjs when the component mounts
    setTimePicker(dayjs());
  }, []);

  // Determine if the DateTimePicker should be disabled based on the selectedOption
  const isDisabled = selectedOption === 'Instant' || selectedOption === '' || data.length === 0;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          label="Select Date"
          value={timePicker}
          onChange={(newValue) => setTimePicker(newValue)}
          ampm={false} // Set 24-hour format
          disabled={isDisabled}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
