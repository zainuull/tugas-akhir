import { IAdmin, IDataAdmin, IDataParticipant, IParticipant } from '../model/IParticipant';

export interface Repository {
  getData(query?: IDataParticipant): Promise<IParticipant>;
  getDataById(id: string): Promise<IParticipant>;
  createData(data: IDataParticipant): Promise<IParticipant>;
  deleteData(id: string): Promise<IParticipant>;
  updateData(id: string, data: IDataParticipant): Promise<IParticipant>;
  // admin
  getDataAdmin(query?: IDataAdmin): Promise<IAdmin>;
  getDataAdminById(id: string): Promise<IAdmin>;
  createDataAdmin(data: IDataAdmin): Promise<IAdmin>;
  deleteDataAdmin(id: string): Promise<IAdmin>;
  updateDataAdmin(id: string, data: IDataAdmin): Promise<IAdmin>;
}
