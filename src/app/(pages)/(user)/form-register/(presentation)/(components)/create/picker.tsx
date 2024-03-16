import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { IDataParticipant } from '../../../domain/model/model';

interface IPicker {
  timePicker: dayjs.Dayjs | null;
  setTimePicker: Function;
  dataInput?: IDataParticipant;
}

export default function Picker(props: IPicker) {
  const { timePicker, setTimePicker, dataInput } = props;
  useEffect(() => {
    const defaultDate = dataInput?.date_of_birth ? dayjs(dataInput.date_of_birth) : dayjs();
    setTimePicker(defaultDate);
  }, [dataInput]); 

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Tanggal Lahir"
          value={timePicker}
          onChange={(newValue) => setTimePicker(newValue)}
          className="w-full"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
