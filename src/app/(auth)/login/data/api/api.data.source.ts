import { Http } from '@/core/services/http/http.client';
import { IUserContextModel } from '../../domain/model/model';
import { Repository } from '../../domain/repository/repository';
import { IUserDataModel, IUserModel } from '@/core/interface/IUser';

export default class ApiDataSourceImpl implements Repository {
  async loginData(data: IUserContextModel) {
    const res = await Http.post<IUserDataModel>('/sign-in', data);
    return res.data;
  }
}
