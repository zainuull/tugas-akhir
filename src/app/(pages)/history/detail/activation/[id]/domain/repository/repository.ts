import { IRequestActivationDataModel, IRequestActivationModel, IRequestActivationQuery } from "../model/model";


export interface Repository {
  getData(query?:IRequestActivationQuery): Promise<IRequestActivationModel>;
  getDataById(id: string): Promise<IRequestActivationDataModel>;
  createData(data: IRequestActivationDataModel): Promise<IRequestActivationModel>;
  deleteData(id: string): Promise<IRequestActivationModel>;
  updateData(id: string, data: IRequestActivationDataModel): Promise<IRequestActivationModel>;
}
