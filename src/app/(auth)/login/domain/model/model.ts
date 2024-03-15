import { IModel } from '@/core/interface/IModel';
import { IQueryModel } from '@/core/interface/IQueryModel';

export interface IUserModel extends IModel {
  data?: IUserDataModel;
}

export interface IUserDataModel {
  _id?: string;
  name?: string;
  username?: string;
  privilege?: IPrivilege;
  token?: string;
}

interface IPrivilege {
  name?: string;
  general_role?: string;
}

export interface IUserContextModel {
  email?: string;
  password?: string;
}

export interface ILoginQuery extends IQueryModel {}
