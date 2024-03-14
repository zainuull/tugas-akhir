import { IModel } from '@/core/interface/IModel';
import { IQueryModel } from '@/core/interface/IQueryModel';

export interface IRequestCreditModel extends IModel {
  totalData?: number;
  totalPage?: number;
  data?: IRequestCreditDataModel[];
}

export interface IRequestCreditDataModel {
  id?: string;
  name?: string;
  quota?: string;
  credit?: number;
  price?: number;
}

export interface IRequestCreditQuery extends IQueryModel {}
