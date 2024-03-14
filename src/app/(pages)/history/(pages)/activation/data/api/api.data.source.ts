import { Http } from '@/core/services/http/http.client';
import { IStatusDataModel, IStatusModel, IStatusQuery } from '../../domain/model/model';
import { Repository } from '../../domain/repository/repository';

export default class ApiDataSourceImpl implements Repository {
  async getData(query?:IStatusQuery) {
    const res = await Http.get<IStatusModel>('/',query);
    return res.data;
  }

  async getDataById(id: string) {
    const res = await Http.get<IStatusDataModel>(`/${id}`);
    return res.data;
  }

  async createData(data: IStatusDataModel) {
    const res = await Http.post<IStatusModel>('/', data);
    return res.data;
  }

  async deleteData(id: string) {
    const res = await Http.delete<IStatusModel>(`/${id}`);
    return res.data;
  }

  async updateData(id: string, data: IStatusDataModel) {
    const res = await Http.put<IStatusModel>(`/${id}`, data);
    return res.data;
  }
}
