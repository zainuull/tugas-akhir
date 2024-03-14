import { IModel } from '@/core/interface/IModel';
import { IQueryModel } from '@/core/interface/IQueryModel';

export interface IRequestCreditModel extends IModel {
  totalData?: number;
  totalPage?: number;
  data?: IRequestCreditDataModel[];
}

export interface IRequestCreditDataModel {
  id?: number;
  value_mb?: number;
  quantity?: number;
  quota?: string;
  credit?: number;
  price?: number;
}

export interface IRequestCreditQuery extends IQueryModel {
  operator_id?: number;
}
