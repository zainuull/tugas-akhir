import { useState } from 'react';
import {
  CreateDataUseCase,
  DeleteDataUseCase,
  GetDataByIdUseCase,
  GetDataUseCase,
  UpdateDataUseCase,
} from '../domain/usecase';
import CoreAPIDataSourceImpl from '@/core/services/data/api/core.api.data.source';
import { IDataParticipant, IParticipant } from '../domain/model/IParticipant';


export default function VM() {
  const [datas, setDatas] = useState<IParticipant>();
  const [dataById, setDataById] = useState<IParticipant>();


  //data source
  const coreDataSource = new CoreAPIDataSourceImpl();

  //use case
  const getDataUseCase = new GetDataUseCase(coreDataSource);
  const getDataByIdUseCase = new GetDataByIdUseCase(coreDataSource);
  const createDataUseCase = new CreateDataUseCase(coreDataSource);
  const deleteDataUseCase = new DeleteDataUseCase(coreDataSource);
  const updateDataUseCase = new UpdateDataUseCase(coreDataSource);

  //function
  async function getData(query?: IDataParticipant) {
    setDatas(await getDataUseCase.invoke(query));
  }

  async function getDataById(id: string) {
    setDataById(await getDataByIdUseCase.invoke(id));
  }

  async function createData(data: IDataParticipant) {
    await createDataUseCase.invoke(data);
  }

  async function deleteData(id: string) {
    await deleteDataUseCase.invoke(id);
  }

  async function updateData(id: string, data: IDataParticipant) {
    await updateDataUseCase.invoke(id, data);
  }

  return {
    getData,
    datas,
    dataById,
    getDataById,
    createData,
    deleteData,
    updateData,
  };
}
