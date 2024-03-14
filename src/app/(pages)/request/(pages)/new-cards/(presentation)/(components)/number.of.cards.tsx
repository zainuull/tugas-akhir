// Icons
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import { ICounts } from './request.new.cards';

interface INumberOfCards {
  counts: ICounts;
  setCounts: Function;
  selectedOption: string;
}

const NumberOfCards = (props: INumberOfCards) => {
  const { counts, setCounts, selectedOption } = props;

  const handleIncrement = (id: string) => {
    setCounts((prevCounts: ICounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1, // Increment count for the specific id
    }));
  };

  const handleDecrement = (id: string) => {
    if (counts[id] && counts[id] > 0) {
      setCounts((prevCounts: ICounts) => ({
        ...prevCounts,
        [id]: prevCounts[id] - 1, // Decrement count for the specific id
      }));
    }
  };

  const handleInputChange = (id: string, value: string) => {
    const newValue = parseInt(value);
    if (!isNaN(newValue) && newValue >= 0) {
      setCounts((prevCounts: ICounts) => ({
        ...prevCounts,
        [id]: newValue, // Update count for the specific id based on input value
      }));
    } else if (value === '') {
      // If input is cleared, set count to 0
      setCounts((prevCounts: ICounts) => ({
        ...prevCounts,
        [id]: 0,
      }));
    }
  };

  return (
    <div
      className={`w-full ${
        selectedOption ? 'bg-primary' : 'bg-gray-400'
      } h-12 flex justify-between items-center text-white px-4 text-sm select-none my-2`}>
      <h1>{selectedOption ? 'Number of Cards' : 'Choose your operator'}</h1>
      <div className="flex items-center gap-x-2 select-none">
        {/* Count */}
        {selectedOption && (
          <span className="flex items-center justify-center min-w-20">
            <button onClick={() => handleIncrement(selectedOption || '')}>
              <CiCirclePlus size={18} />
            </button>
            <input
              value={counts[selectedOption || ''] || 0}
              onChange={(e) => handleInputChange(selectedOption || '', e.target.value)}
              className="w-20 outline-none px-1 text-white text-center bg-transparent"
              maxLength={6}
            />
            <button onClick={() => handleDecrement(selectedOption || '')}>
              <CiCircleMinus size={18} />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default NumberOfCards;
