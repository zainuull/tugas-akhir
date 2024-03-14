import { IModel } from '@/core/interface/IModel';
import { IQueryModel } from '@/core/interface/IQueryModel';

export interface IStatusModel extends IModel {
  totalData?: number;
  totalPage?: number;
  data?: IStatusDataModel[];
}

export interface IStatusDataModel {
  id?: string;
  name?: string;
}

export interface IData {
  id: number;
  time: string;
  client?: string;
  operator: string;
  total_card?: number;
  status?: string;
}


export interface IStatusQuery extends IQueryModel {}
