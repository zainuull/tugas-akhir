import { IModel } from '@/core/interface/IModel';
import { IQueryModel } from '@/core/interface/IQueryModel';

export interface IRequestInjectionModel extends IModel {
  totalData?: number;
  totalPage?: number;
  data?: IRequestInjectionDataModel[];
}

export interface IRequestInjectionDataModel {
  id?: string;
  name?: string;
  quota?: string;
  credit?: number;
  price?: number;
}

export interface IDataEndUser {
  id?: string;
  name: string;
  email: string;
  age: string;
  province: string;
  action?: string;
}

export interface IRequestInjectionQuery extends IQueryModel {}
