import { IRequestCreditDataModel, IRequestCreditModel, IRequestCreditQuery } from "../model/model";


export interface Repository {
  getData(query?:IRequestCreditQuery): Promise<IRequestCreditModel>;
  getDataById(id: string): Promise<IRequestCreditDataModel>;
  createData(data: IRequestCreditDataModel): Promise<IRequestCreditModel>;
  deleteData(id: string): Promise<IRequestCreditModel>;
  updateData(id: string, data: IRequestCreditDataModel): Promise<IRequestCreditModel>;
}
