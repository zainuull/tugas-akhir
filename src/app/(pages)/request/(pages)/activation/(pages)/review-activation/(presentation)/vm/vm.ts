import { useState } from 'react';
import {
  IRequestActivationDataModel,
  IRequestActivationModel,
  IRequestActivationQuery,
} from '../../../../domain/model/model';
import ApiDataSourceImpl from '../../../../data/api/api.data.source';
import {
  CreateDataUseCase,
  DeleteDataUseCase,
  DownloadTemplateCSVUseCase,
  GetDataByIdUseCase,
  GetDataUseCase,
  UpdateDataUseCase,
  VerifyFileUseCase,
} from '../../../../domain/usecase';
import CoreAPIDataSourceImpl from '@/core/services/data/api/core.api.data.source';
import { GetEndUserUseCase } from '@/core/services/domain/usecase';
import { IEndUserModel } from '@/core/services/domain/model/region.model';

export default function VM() {
  const [datas, setDatas] = useState<IRequestActivationModel>();
  const [dataById, setDataById] = useState<IRequestActivationDataModel>();
  const [endUsers, setEndUsers] = useState<IEndUserModel>();

  //data source
  const dataSourceImpl = new ApiDataSourceImpl();
  const coreDataSource = new CoreAPIDataSourceImpl();

  //use case
  const getDataUseCase = new GetDataUseCase(dataSourceImpl);
  const getDataByIdUseCase = new GetDataByIdUseCase(dataSourceImpl);
  const createDataUseCase = new CreateDataUseCase(dataSourceImpl);
  const deleteDataUseCase = new DeleteDataUseCase(dataSourceImpl);
  const updateDataUseCase = new UpdateDataUseCase(dataSourceImpl);

  const verifyFileUseCase = new VerifyFileUseCase(dataSourceImpl);
  const downloadTemplateCSVUseCase = new DownloadTemplateCSVUseCase(dataSourceImpl);
  const getEndUserUseCase = new GetEndUserUseCase(coreDataSource);

  //function
  async function getData(query?: IRequestActivationQuery) {
    setDatas(await getDataUseCase.invoke(query));
  }

  async function getDataById(id: string) {
    setDataById(await getDataByIdUseCase.invoke(id));
  }

  async function createData(data: IRequestActivationDataModel) {
    await createDataUseCase.invoke(data);
  }

  async function deleteData(id: string) {
    await deleteDataUseCase.invoke(id);
  }

  async function updateData(id: string, data: IRequestActivationDataModel) {
    await updateDataUseCase.invoke(id, data);
  }

  async function verifyFile(id: number, data: any) {
    await verifyFileUseCase.invoke(id, data);
  }

  async function downloadTemplateCSV() {
    await downloadTemplateCSVUseCase.invoke();
  }

  async function getEndUser() {
    setEndUsers(await getEndUserUseCase.invoke());
  }

  return {
    getData,
    datas,
    dataById,
    getDataById,
    createData,
    deleteData,
    updateData,
    //verify
    verifyFile,
    //download template
    downloadTemplateCSV,
    //enduser
    getEndUser,
    endUsers,
  };
}
