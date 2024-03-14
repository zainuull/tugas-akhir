import { IRequestInjectionDataModel, IRequestInjectionModel, IRequestInjectionQuery } from "../model/model";


export interface Repository {
  getData(query?:IRequestInjectionQuery): Promise<IRequestInjectionModel>;
  getDataById(id: string): Promise<IRequestInjectionDataModel>;
  createData(data: IRequestInjectionDataModel): Promise<IRequestInjectionModel>;
  deleteData(id: string): Promise<IRequestInjectionModel>;
  updateData(id: string, data: IRequestInjectionDataModel): Promise<IRequestInjectionModel>;
}
