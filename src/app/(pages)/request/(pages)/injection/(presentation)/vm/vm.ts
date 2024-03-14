import { useState } from 'react';
import {
  IRequestInjectionDataModel,
  IRequestInjectionModel,
  IRequestInjectionQuery,
} from '../../domain/model/model';
import ApiDataSourceImpl from '../../data/api/api.data.source';
import {
  CreateDataUseCase,
  DeleteDataUseCase,
  GetDataByIdUseCase,
  GetDataUseCase,
  UpdateDataUseCase,
} from '../../domain/usecase';
import CoreAPIDataSourceImpl from '@/core/services/data/api/core.api.data.source';
import { GetEndUserUseCase, GetRegionUseCase } from '@/core/services/domain/usecase';
import { IEndUserModel, IRegionModel } from '@/core/services/domain/model/region.model';

export default function VM() {
  const [datas, setDatas] = useState<IRequestInjectionModel>();
  const [dataById, setDataById] = useState<IRequestInjectionDataModel>();
  const [region, setRegion] = useState<IRegionModel>();
  const [endUser, setEndUser] = useState<IEndUserModel>();

  //data source
  const dataSourceImpl = new ApiDataSourceImpl();
  const coreDataSource = new CoreAPIDataSourceImpl();

  //use case
  const getDataUseCase = new GetDataUseCase(dataSourceImpl);
  const getDataByIdUseCase = new GetDataByIdUseCase(dataSourceImpl);
  const createDataUseCase = new CreateDataUseCase(dataSourceImpl);
  const deleteDataUseCase = new DeleteDataUseCase(dataSourceImpl);
  const updateDataUseCase = new UpdateDataUseCase(dataSourceImpl);

  //region
  const getRegionUseCase = new GetRegionUseCase(coreDataSource);
  //End User
  const getEndUserUseCase = new GetEndUserUseCase(coreDataSource);

  //function
  async function getData(query?: IRequestInjectionQuery) {
    setDatas(await getDataUseCase.invoke(query));
  }

  async function getDataById(id: string) {
    setDataById(await getDataByIdUseCase.invoke(id));
  }

  async function createData(data: IRequestInjectionDataModel) {
    await createDataUseCase.invoke(data);
  }

  async function deleteData(id: string) {
    await deleteDataUseCase.invoke(id);
  }

  async function updateData(id: string, data: IRequestInjectionDataModel) {
    await updateDataUseCase.invoke(id, data);
  }

  async function getRegion() {
    setRegion(await getRegionUseCase.invoke());
  }

  async function getEndUser() {
    setEndUser(await getEndUserUseCase.invoke());
  }

  return {
    getData,
    datas,
    dataById,
    getDataById,
    createData,
    deleteData,
    updateData,
    //region
    getRegion,
    region,
    //enduser,
    getEndUser,
    endUser,
  };
}
