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

export interface IData {
  id: number;
  MSISDN?: string;
  End_User?: string;
  Region?: string;
  Status?: string;
  Quota?: string;
  Quota_Expired?: string;
}

export interface IRequestInjectionQuery extends IQueryModel {}
