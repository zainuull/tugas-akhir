import { IModel } from '@/core/interface/IModel';
import { IQueryModel } from '@/core/interface/IQueryModel';

export interface IParticipant extends IModel {
  totalData?: number;
  totalPage?: number;
  data?: IDataParticipant[];
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
  image_url?: string;
  isPaid?: boolean;
  action?: string;
  created_at?: string;
}

export interface IParticipantQuery extends IQueryModel {}
