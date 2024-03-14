import { IModel } from '@/core/interface/IModel';
import { IQueryModel } from '@/core/interface/IQueryModel';

export interface IRequestActivationModel extends IModel {
  totalData?: number;
  totalPage?: number;
  data?: IRequestActivationDataModel[];
}

export interface IRequestActivationDataModel {
  id?: string;
  phone?: string;
  operator?: string;
  status?: string;
  sim_expired?: string;
}

export interface IData {
  id: number;
  phone: string;
  operator: string;
  status: string;
  sim_expired: string;
  activation_status: boolean;
}

export interface IRequestActivationQuery extends IQueryModel {}
