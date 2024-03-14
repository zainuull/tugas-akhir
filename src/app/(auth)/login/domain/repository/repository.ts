import { IUserContextModel, IUserDataModel, IUserModel } from '../model/model';

export interface Repository {
  loginData(data: IUserContextModel): Promise<IUserDataModel>;
}
