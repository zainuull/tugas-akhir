import { useState } from 'react';
import {
  IEndUserModel,
  IOperatorModel,
  IRegionModel,
} from '@/core/services/domain/model/region.model';
import {
  GetEndUserUseCase,
  GetOperatorUseCase,
  GetRegionUseCase,
} from '@/core/services/domain/usecase';
import CoreAPIDataSourceImpl from '@/core/services/data/api/core.api.data.source';

export default function VM() {
  const [providers, setProviders] = useState<IOperatorModel>();
  const [endUser, setEndUser] = useState<IEndUserModel>();
  const [region, setRegion] = useState<IRegionModel>();

  //data source
  const coreDataSource = new CoreAPIDataSourceImpl();

  //operator
  const getOperatorUseCase = new GetOperatorUseCase(coreDataSource);
  const getEndUserUseCase = new GetEndUserUseCase(coreDataSource);
  const getRegionUseCase = new GetRegionUseCase(coreDataSource);

  //function
  async function getOperator() {
    setProviders(await getOperatorUseCase.invoke());
  }

  async function getEndUser() {
    setEndUser(await getEndUserUseCase.invoke());
  }

  async function getRegion() {
    setRegion(await getRegionUseCase.invoke());
  }

  return {
    getOperator,
    providers,
    getEndUser,
    endUser,
    getRegion,
    region,
  };
}
