import { useEffect } from 'react';
import Select from 'react-select';
import VM from '../../vm/vm';
import { IDataEndUserModel } from '@/core/services/domain/model/region.model';

const ClientDropdown = ({client, setClient}: {client:IDataEndUserModel, setClient:Function}) => {
  const { getEndUser, endUsers } = VM();

  useEffect(() => {
    getEndUser();
  }, []);

  const Option = endUsers?.data?.map((data: IDataEndUserModel) => ({
    value: data.id,
    label: data.name,
  }));

 const handle = (option: any) => {
    setClient({
      id: option?.value,
      name: option?.label,
    });
  };

  return (
    <Select
      closeMenuOnSelect={true}
      options={Option}
      value={Option?.find((option) => option.label === client.name)}
      isClearable={true}
      isSearchable={true}
      onChange={handle}
      placeholder="Pilih Client"
    />
  );
};

export default ClientDropdown;
