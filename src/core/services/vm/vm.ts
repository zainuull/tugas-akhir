import { useState } from 'react';
import {
  CreateDataAdminUseCase,
  CreateDataUseCase,
  DeleteDataAdminUseCase,
  DeleteDataUseCase,
  GetDataAdminByIdUseCase,
  GetDataAdminUseCase,
  GetDataByIdUseCase,
  GetDataUseCase,
  UpdateDataAdminUseCase,
  UpdateDataUseCase,
} from '../domain/usecase';
import CoreAPIDataSourceImpl from '@/core/services/data/api/core.api.data.source';
import { IAdmin, IDataAdmin, IDataParticipant, IParticipant } from '../domain/model/IParticipant';

export default function VM() {
  const [datas, setDatas] = useState<IParticipant>();
  const [dataById, setDataById] = useState<IParticipant>();
  // admin
  const [datasAdmin, setDatasAdmin] = useState<IAdmin>();
  const [dataAdminById, setDataAdminById] = useState<IAdmin>();

  //data source
  const coreDataSource = new CoreAPIDataSourceImpl();

  //use case
  const getDataUseCase = new GetDataUseCase(coreDataSource);
  const getDataByIdUseCase = new GetDataByIdUseCase(coreDataSource);
  const createDataUseCase = new CreateDataUseCase(coreDataSource);
  const deleteDataUseCase = new DeleteDataUseCase(coreDataSource);
  const updateDataUseCase = new UpdateDataUseCase(coreDataSource);
  // admin use case
  const getDataAdminUseCase = new GetDataAdminUseCase(coreDataSource);
  const getDataAdminByIdUseCase = new GetDataAdminByIdUseCase(coreDataSource);
  const createDataAdminUseCase = new CreateDataAdminUseCase(coreDataSource);
  const deleteDataAdminUseCase = new DeleteDataAdminUseCase(coreDataSource);
  const updateDataAdminUseCase = new UpdateDataAdminUseCase(coreDataSource);

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

  //function admin
  async function getDataAdmin(query?: IDataAdmin) {
    setDatasAdmin(await getDataAdminUseCase.invoke(query));
  }

  async function getDataAdminById(id: string) {
    setDataAdminById(await getDataAdminByIdUseCase.invoke(id));
  }

  async function createDataAdmin(data: IDataAdmin) {
    await createDataAdminUseCase.invoke(data);
  }

  async function deleteDataAdmin(id: string) {
    await deleteDataAdminUseCase.invoke(id);
  }

  async function updateDataAdmin(id: string, data: IDataAdmin) {
    await updateDataAdminUseCase.invoke(id, data);
  }

  return {
    getData,
    datas,
    dataById,
    getDataById,
    createData,
    deleteData,
    updateData,
    // Admin
    getDataAdmin,
    datasAdmin,
    dataAdminById,
    getDataAdminById,
    createDataAdmin,
    deleteDataAdmin,
    updateDataAdmin,
  };
}
