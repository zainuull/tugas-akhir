import { IDashboardDataModel, IDashboardModel } from "../model/model";

export interface Repository {
  getData(): Promise<IDashboardModel>;
  getDataById(id: string): Promise<IDashboardDataModel>;
  createData(data: IDashboardDataModel): Promise<IDashboardModel>;
  deleteData(id: string): Promise<IDashboardModel>;
  updateData(id: string, data: IDashboardDataModel): Promise<IDashboardModel>;
}
