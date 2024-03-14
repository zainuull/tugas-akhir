import { Http } from '@/core/services/http/http.client';
import { IOperatorModel, IRegionModel, IRoleModel } from '../../domain/model/region.model';
import { Repository } from '../../domain/repository/repository';

export default class CoreAPIDataSourceImpl implements Repository {
  async getOperator() {
    const res = await Http.get<IOperatorModel>('/operator');
    return res.data;
  }

  async getRegion() {
    const res = await Http.get<IRegionModel>('/region');
    return res.data;
  }

  async getEndUser() {
    const res = await Http.get<IRegionModel>('/end-user');
    console.log('res', res.data);

    return res.data;
  }

  async getRole() {
    const res = await Http.get<IRoleModel>('/role');
    return res.data;
  }
}
