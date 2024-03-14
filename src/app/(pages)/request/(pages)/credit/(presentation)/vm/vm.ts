import { useState } from 'react';
import {
  IRequestCreditDataModel,
  IRequestCreditModel,
  IRequestCreditQuery,
} from '../../domain/model/model';
import ApiDataSourceImpl from '../../data/api/api.data.source';
import {
  CreateDataUseCase,
  DeleteDataUseCase,
  GetDataByIdUseCase,
  GetRemainingCredit,
  UpdateDataUseCase,
} from '../../domain/usecase';
import { IEndUserModel } from '@/core/services/domain/model/region.model';
import CoreAPIDataSourceImpl from '@/core/services/data/api/core.api.data.source';
import { GetEndUserUseCase } from '@/core/services/domain/usecase';
import { GetDataCredit } from '../../domain/usecase/get.data.credit';

export default function VM() {
  const [datasCredit, setDatasCredit] = useState<IRequestCreditModel>();
  const [remainingCredit, setRemainingCredit] = useState<IRequestCreditModel>();
  const [dataById, setDataById] = useState<IRequestCreditDataModel>();
  const [endUser, setEndUser] = useState<IEndUserModel>();

  //data source
  const dataSourceImpl = new ApiDataSourceImpl();
  const coreDataSource = new CoreAPIDataSourceImpl();

  //use case
  const getDataCreditUseCase = new GetDataCredit(dataSourceImpl);
  const getRemainingCreditUseCase = new GetRemainingCredit(dataSourceImpl);
  const getDataByIdUseCase = new GetDataByIdUseCase(dataSourceImpl);
  const createDataUseCase = new CreateDataUseCase(dataSourceImpl);
  const deleteDataUseCase = new DeleteDataUseCase(dataSourceImpl);
  const updateDataUseCase = new UpdateDataUseCase(dataSourceImpl);

  //End User
  const getEndUserUseCase = new GetEndUserUseCase(coreDataSource);

  //function

  async function getDataCredit(query?: IRequestCreditQuery) {
    setDatasCredit(await getDataCreditUseCase.invoke(query));
  }

  async function getRemainingCredit(query?: IRequestCreditQuery) {
    setRemainingCredit(await getRemainingCreditUseCase.invoke(query));
  }

  async function getDataById(id: string) {
    setDataById(await getDataByIdUseCase.invoke(id));
  }

  async function createData(data: IRequestCreditDataModel) {
    await createDataUseCase.invoke(data);
  }

  async function deleteData(id: string) {
    await deleteDataUseCase.invoke(id);
  }

  async function updateData(id: string, data: IRequestCreditDataModel) {
    await updateDataUseCase.invoke(id, data);
  }

  async function getEndUser() {
    setEndUser(await getEndUserUseCase.invoke());
  }

  return {
    getDataCredit,
    datasCredit,
    getRemainingCredit,
    remainingCredit,
    dataById,
    getDataById,
    createData,
    deleteData,
    updateData,
    //enduser,
    getEndUser,
    endUser,
  };
}
