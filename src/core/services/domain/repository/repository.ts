import { IDataParticipant, IParticipant } from "../model/IParticipant";


export interface Repository {
  getData(query?: IDataParticipant): Promise<IParticipant>;
  getDataById(id: string): Promise<IParticipant>;
  createData(data: IDataParticipant): Promise<IParticipant>;
  deleteData(id: string): Promise<IParticipant>;
  updateData(id: string, data: IDataParticipant): Promise<IParticipant>;
}
