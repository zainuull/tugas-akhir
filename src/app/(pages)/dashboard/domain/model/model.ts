import { IModel } from '@/core/interface/IModel';
import { IQueryModel } from '@/core/interface/IQueryModel';

export interface IDashboardModel extends IModel {
  totalData?: number;
  totalPage?: number;
  data?: IDashboardDataModel[];
}

export interface IDashboardDataModel {
  id?: string;
  name?: string;
}


export interface IDashboardQuery extends IQueryModel {}
