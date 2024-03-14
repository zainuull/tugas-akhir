import { IModel } from '@/core/interface/IModel';

export interface IOperatorModel {
  data?: IDataOperatorModel[];
}

export interface IDataOperatorModel  {
  id?: number;
  name?: string;
}

export interface IRegionModel {
  data?: IDataRegionModel[];
}

export interface IDataRegionModel extends IModel {
  id?: number;
  name?: string;
}

export interface IEndUserModel {
  data?: IDataEndUserModel[];
}

export interface IDataEndUserModel extends IModel {
  id?: number;
  name?: string;
}

export interface ICreditModel {
  data?: IDataCreditModel[];
}

export interface IDataCreditModel extends IModel {
  id?: number;
  name?: string;
}

export interface IRoleModel {
  data?: IDataRoleModel[];
}

export interface IDataRoleModel extends IModel {
  id?: number;
  name?: string;
  username?: string;
  privilege?: IPrivilage;
}

interface IPrivilage {
  general_role?: string;
  name?: string;
}
