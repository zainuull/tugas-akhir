import OperatorDropdown from '@/app/(sharedComponents)/dropdown/operator.dropdown';
import ListTable from './ltable/list.table';
// Icons
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IDataRequestActivationModel } from '../../../domain/model/model';
import { IDataEndUserModel, IDataOperatorModel } from '@/core/services/domain/model/region.model';
import ClientDropdown from '../dropdown/client.dropdown';

interface IListCard {
  operator: IDataOperatorModel;
  setOperator: Function;
  data: IDataRequestActivationModel[];
  role: string;
  client: IDataEndUserModel;
  setClient: Function;
}

const ListCard = (props: IListCard) => {
  const { operator, setOperator, data, role, client, setClient } = props;
  return (
    <div className="w-full min-h-40 bg-white flex flex-col rounded-lg gap-y-4 col-span-3">
      <div
        className={`w-full grid ${
          role === 'admin' ? 'grid-cols-3' : 'grid-cols-2'
        } p-4 gap-x-4 text-sm`}>
        {role === 'admin' && (
          <span className="w-full text-sm">
            <p>Client</p>
            <ClientDropdown setClient={setClient} client={client} />
          </span>
        )}
        <span className="col-span-1">
          <p>Operator</p>
          <OperatorDropdown operator={operator} setOperator={setOperator} />
        </span>
        <span className="col-span-1 h-full flex items-end">
          <div className="bg-gray-100 w-full flex items-center gap-x-2 rounded-lg px-2 h-10 file:">
            <HiMagnifyingGlass />
            <input
              className={`bg-transparent outline-none w-full text-sm ${
                !operator.id && 'cursor-not-allowed'
              }`}
              placeholder="Search"
              disabled={!operator}
            />
          </div>
        </span>
      </div>
      {operator.id ? (
        <ListTable ExcelData={data} operator={operator}/>
      ) : (
        <p className="w-full h-full text-center text-xl text-gray-400 my-20">
          Choose your operator{' '}
        </p>
      )}
    </div>
  );
};

export default ListCard;
