import { IStatusDataModel, IStatusModel, IStatusQuery } from "../model/model";


export interface Repository {
  getData(query?:IStatusQuery): Promise<IStatusModel>;
  getDataById(id: string): Promise<IStatusDataModel>;
  createData(data: IStatusDataModel): Promise<IStatusModel>;
  deleteData(id: string): Promise<IStatusModel>;
  updateData(id: string, data: IStatusDataModel): Promise<IStatusModel>;
}
