import { useState } from 'react';
import { IStatusDataModel, IStatusModel, IStatusQuery } from '../../domain/model/model';
import ApiDataSourceImpl from '../../data/api/api.data.source';
import {
  CreateDataUseCase,
  DeleteDataUseCase,
  GetDataByIdUseCase,
  GetDataUseCase,
  UpdateDataUseCase,
} from '../../domain/usecase';

export default function VM() {
  const [datas, setDatas] = useState<IStatusModel>();
  const [dataById, setDataById] = useState<IStatusDataModel>();

  //data source
  const dataSourceImpl = new ApiDataSourceImpl();

  //use case
  const getDataUseCase = new GetDataUseCase(dataSourceImpl);
  const getDataByIdUseCase = new GetDataByIdUseCase(dataSourceImpl);
  const createDataUseCase = new CreateDataUseCase(dataSourceImpl);
  const deleteDataUseCase = new DeleteDataUseCase(dataSourceImpl);
  const updateDataUseCase = new UpdateDataUseCase(dataSourceImpl);

  //function
  async function getData(query?:IStatusQuery) {
    setDatas(await getDataUseCase.invoke(query));
  }

  async function getDataById(id: string) {
    setDataById(await getDataByIdUseCase.invoke(id));
  }

  async function createData(data: IStatusDataModel) {
    await createDataUseCase.invoke(data);
  }

  async function deleteData(id: string) {
    await deleteDataUseCase.invoke(id);
  }

  async function updateData(id: string, data: IStatusDataModel) {
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
