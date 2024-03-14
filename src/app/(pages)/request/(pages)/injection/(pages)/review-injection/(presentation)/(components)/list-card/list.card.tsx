import OperatorDropdown from '@/app/(sharedComponents)/dropdown/operator.dropdown';
import ClientDropdown from '../dropdown/client.dropdown';
import RegionDropdown from '../dropdown/region.dropdown';
import ListTable from './ltable/list.table';
// Icons
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IDataOperatorModel } from '@/core/services/domain/model/region.model';

interface IListCard {
  operator: IDataOperatorModel;
  setOperator: Function;
  data: any[];
}

const ListCard = (props: IListCard) => {
  const { operator, setOperator, data } = props;
  return (
    <div className="w-full min-h-40 bg-white flex flex-col rounded-lg gap-y-4 col-span-3">
      {/* Dropdown */}
      <div className="w-full grid grid-cols-2 items-center gap-x-5 gap-y-2 p-4 text-sm">
        <span className="col-span-1">
          <p>Operator</p>
          <OperatorDropdown operator={operator} setOperator={setOperator} />
        </span>
        <span className="col-span-1">
          <p>Client</p>
          <ClientDropdown />
        </span>
        <span className="col-span-1">
          <p>Region</p>
          <RegionDropdown />
        </span>
        <span className="col-span-1 h-full flex items-end">
          <div className="bg-gray-100 w-full flex items-center gap-x-2 rounded-lg px-2 h-10 file:">
            <HiMagnifyingGlass />
            <input
              className={`bg-transparent outline-none w-full text-sm ${
                !operator.id && 'cursor-not-allowed'
              }`}
              placeholder="Search"
              disabled={!operator.id}
            />
          </div>
        </span>
      </div>
      {operator.id ? (
        <ListTable data={data} />
      ) : (
        <p className="w-full h-full text-center text-xl text-gray-400 my-20">
          Choose your operator{' '}
        </p>
      )}
    </div>
  );
};

export default ListCard;
