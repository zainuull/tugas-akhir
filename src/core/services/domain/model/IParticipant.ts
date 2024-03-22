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
  image?: string;
  isPaid?: boolean;
  action?: string;
  created_at?: string;
  no_antrian?: string;
}

export interface IParticipantQuery extends IQueryModel {}

// Admin
export interface IAdmin extends IModel {
  status?: string;
  message?: string;
  data?: IDataAdmin[];
}

export interface IDataAdmin {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  old_password?: string;
  role?: string;
  image?: string;
  action?: string;
  created_at?: string;
}

export interface IAdminQuery extends IQueryModel {}
