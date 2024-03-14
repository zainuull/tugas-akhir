import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';



interface IDetailOrder {
  clientCredit: boolean;
  setClientCredit: Function;
}

const DetailOrder = (props: IDetailOrder) => {
  const { clientCredit, setClientCredit } = props;
  const handleClientCredit = () => {
    setClientCredit(!clientCredit);
  };
  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <div>
        <h1 className="font-semibold text-lg">Order ID: AR-39fu-38nd</h1>
        <span className="flex gap-x-3 text-sm mt-4">
          <span className="flex flex-col gap-y-2">
            <p>Client</p>
            <p>Operator</p>
            <p>Request Creation Time</p>
          </span>
          <span className="flex flex-col gap-y-2">
            <p>: Easy Go</p>
            <p>: Telkomsel</p>
            <p>: 2024-02-25 07:00:00 WIB</p>
          </span>
        </span>
      </div>
      <FormControlLabel
        control={
          <Checkbox
            checked={clientCredit}
            onChange={handleClientCredit}
            inputProps={{ 'aria-label': 'Use Client’s Credits' }}
          />
        }
        label="Use Client’s Credits"
      />
    </div>
  );
};

export default DetailOrder;
