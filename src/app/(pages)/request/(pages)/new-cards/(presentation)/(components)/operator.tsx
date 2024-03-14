import { mockData } from '../../data/mock';
import { ICounts } from './request.new.cards';

interface IOperator {
  setCounts: Function;
  selectedOption: string;
  setSelectedOption: Function;
}

const Operator = (props: IOperator) => {
  const { setCounts, selectedOption, setSelectedOption } = props;
  const handleChange = (label: string) => {
    setSelectedOption(label === selectedOption ? null : label);
    setCounts({}); // Reset counts when operator changes
  };

  return (
    <span>
      <h1>Operator</h1>
      <span className="flex items-center gap-x-6 text-sm mt-2">
        {mockData.map((data: any, idx: number) => (
          <span key={idx} className="flex items-center gap-x-2">
            <input
              id={data.operator}
              type="radio"
              name="operator"
              value={data.operator}
              checked={selectedOption === data.operator}
              onChange={() => handleChange(data.operator)}
            />
            <label htmlFor={data.operator}>
              {data.operator}
              <span className="text-xs text-gray-400">({data.cards} cards)</span>
            </label>
          </span>
        ))}
      </span>
    </span>
  );
};

export default Operator;
