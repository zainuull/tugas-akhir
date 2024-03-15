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

export interface IDataParticipant {
  id?: string;
  nik?: string;
  name?: string;
  place_of_birth?: string;
  date_of_birth?: string;
  biological_mother?: string;
  work?: string;
  protection_period?: string;
  action?: string;
}

export interface IRequestInjectionQuery extends IQueryModel {}
