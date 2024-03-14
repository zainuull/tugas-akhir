'use client';
import CreditDropdown from '../dropdown/credit.dropdown';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Picker from './picker';
import { IDataCreditModel, IDataOperatorModel } from '@/core/services/domain/model/region.model';
import dayjs from 'dayjs';
import { IData } from '../../../domain/model/model';

interface ICredit {
  data: IData[];
  operator: IDataOperatorModel;
  credit: IDataCreditModel;
  setCredit: Function;
  selectedOption: string;
  setSelectedOption: Function;
  timePicker: dayjs.Dayjs | null;
  setTimePicker: Function;
  clientCredit: boolean;
  setClientCredit: Function;
  role: string;
}

const Credit = (props: ICredit) => {
  const {
    operator,
    credit,
    setCredit,
    selectedOption,
    setSelectedOption,
    setTimePicker,
    timePicker,
    data,
    clientCredit,
    setClientCredit,
    role,
  } = props;

  const handleChange = (label: string) => {
    setSelectedOption(label === selectedOption ? '' : label);
  };

  const handleClientCredit = () => {
    setClientCredit(!clientCredit);
  };

  return (
    <div className="w-full min-h-52 bg-white rounded-lg p-4">
      {operator.id ? (
        <div className="w-full flex flex-col gap-y-6">
          {/* Credit */}
          <span>
            <p>Credit</p>
            <CreditDropdown credit={credit} setCredit={setCredit} />
          </span>
          {/* Injection Time */}
          {data.length ? (
            <>
              <span>
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
                  disabled={!data.length}
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
                  disabled={!data.length}
                  label="Scheduled"
                />
                <Picker
                  data={data}
                  selectedOption={selectedOption || ''}
                  setTimePicker={setTimePicker}
                  timePicker={timePicker}
                />
              </span>
              {role === 'admin' && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={clientCredit}
                      onChange={handleClientCredit}
                      inputProps={{ 'aria-label': 'Use Client’s Credits' }}
                    />
                  }
                  disabled={!data.length}
                  label="Use Client’s Credits"
                />
              )}
            </>
          ) : (
            <p className="w-full h-full text-center text-xl text-gray-400 my-20">
              Upload your Excel
            </p>
          )}
        </div>
      ) : (
        <p className="w-full h-full text-center text-xl text-gray-400 my-20">
          Choose your operator
        </p>
      )}
    </div>
  );
};
export default Credit;
