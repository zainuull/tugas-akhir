import { IModel } from '@/core/interface/IModel';
import { IQueryModel } from '@/core/interface/IQueryModel';

export interface IRequestActivationModel extends IModel {
  totalData?: number;
  totalPage?: number;
  data?: IDataRequestActivationModel[];
}

export interface IRequestActivationDataModel {
  id?: string;
  operator?: string;
  file?: IDataRequestActivationModel;
  end_user?: number;
  end_user_name?: string;
  region?: number;
  region_name?: string;
}

export interface IOperator {
  id: number;
  label: string;
}

export interface IDataRequestActivationModel {
  id: number;
  msisdn?: string;
  region_id?: number;
  end_user_id?: number;
  client_id?: number;
  operator_id?: number;
  status?: string;
  whitelist?: string;
  sim_expired?: string;
  created_by?: string;
  created_at?: string;
  updated_by?: string;
  updated_at?: string;
}

export interface IRequestActivationQuery extends IQueryModel {
  operator_id?: number;
}
