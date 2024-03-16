import { useState } from 'react';
import { IDashboardDataModel, IDashboardModel } from '../../domain/model/model';
import ApiDataSourceImpl from '../../data/api/api.data.source';
import {
  CreateDataUseCase,
  DeleteDataUseCase,
  GetDataByIdUseCase,
  GetDataUseCase,
  UpdateDataUseCase,
} from '../../domain/usecase';
import CoreAPIDataSourceImpl from '@/core/services/data/api/core.api.data.source';
import { GetOperatorUseCase } from '@/core/services/domain/usecase';
import { IOperatorModel } from '@/core/services/domain/model/region.model';

export default function VM() {
  const [datas, setDatas] = useState<IDashboardModel>();
  const [dataById, setDataById] = useState<IDashboardDataModel>();
  const [operator, setOperator] = useState<IOperatorModel>();

  //data source
  const dataSourceImpl = new ApiDataSourceImpl();
  const operatorDataSource = new CoreAPIDataSourceImpl();

  //use case
  const getDataUseCase = new GetDataUseCase(dataSourceImpl);
  const getDataByIdUseCase = new GetDataByIdUseCase(dataSourceImpl);
  const createDataUseCase = new CreateDataUseCase(dataSourceImpl);
  const deleteDataUseCase = new DeleteDataUseCase(dataSourceImpl);
  const updateDataUseCase = new UpdateDataUseCase(dataSourceImpl);

  //operator
  const getOperatorUseCase = new GetOperatorUseCase(operatorDataSource);

  //function
  async function getData() {
    setDatas(await getDataUseCase.invoke());
  }

  async function getDataById(id: string) {
    setDataById(await getDataByIdUseCase.invoke(id));
  }

  async function createData(data: IDashboardDataModel) {
    await createDataUseCase.invoke(data);
  }

  async function deleteData(id: string) {
    await deleteDataUseCase.invoke(id);
  }

  async function updateData(id: string, data: IDashboardDataModel) {
    await updateDataUseCase.invoke(id, data);
  }

  async function getOperator() {
    setOperator(await getOperatorUseCase.invoke());
  }

  return {
    getData,
    datas,
    dataById,
    getDataById,
    createData,
    deleteData,
    updateData,
    //operator
    getOperator,
    operator,
  };
}
