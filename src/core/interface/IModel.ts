export interface IModel {
  _id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IDataModel {
  _id?: string;
  isDeleted?: boolean;
  isActive?: boolean;
  deletedAt?: Date;
  created_at?: Date;
  created_by?: any;
  updated_at?: Date;
  updated_by?: any;
  deleted_at?: Date;
  deleted_by?: any;
  printed_at?: Date;
  printed_by?: any;
}
