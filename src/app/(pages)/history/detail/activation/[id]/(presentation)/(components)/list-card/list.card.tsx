import OperatorDropdown from '@/app/(sharedComponents)/dropdown/operator.dropdown';
import ListTable from './ltable/list.table';
// Icons
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IDataOperatorModel } from '@/core/services/domain/model/region.model';

interface IListCard {
  operator: IDataOperatorModel;
  setOperator: Function;
}

const ListCard = (props: IListCard) => {
  const { operator, setOperator } = props;
  return (
    <div className="w-full min-h-40 bg-white flex flex-col rounded-lg gap-y-4 col-span-3">
      <div className="w-full grid grid-cols-2 p-4 gap-x-4 text-sm">
        <span className="col-span-1">
          <p>Operator</p>
          <OperatorDropdown operator={operator} setOperator={setOperator} />
        </span>
        <span className="col-span-1 h-full flex items-end">
          <div className="bg-gray-100 w-full flex items-center gap-x-2 rounded-lg px-2 h-10 file:">
            <HiMagnifyingGlass />
            <input
              className={`bg-transparent outline-none w-full text-sm ${
                !operator && 'cursor-not-allowed'
              }`}
              placeholder="Search"
              disabled={!operator}
            />
          </div>
        </span>
      </div>
      {operator ? (
        <ListTable />
      ) : (
        <p className="w-full h-full text-center text-xl text-gray-400 my-20">
          Choose your operator{' '}
        </p>
      )}
    </div>
  );
};

export default ListCard;
