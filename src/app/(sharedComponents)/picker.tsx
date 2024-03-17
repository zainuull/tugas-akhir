import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { IDataParticipant } from '@/core/services/domain/model/IParticipant';

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

  const today = dayjs();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Tanggal Lahir"
          value={timePicker}
          onChange={(newValue) => setTimePicker(newValue)}
          className="w-full"
          maxDate={today}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
