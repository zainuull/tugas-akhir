import { Http } from '@/core/services/http/http.client';
import { IRequestInjectionDataModel, IRequestInjectionModel, IRequestInjectionQuery } from '../../domain/model/model';
import { Repository } from '../../domain/repository/repository';

export default class ApiDataSourceImpl implements Repository {
  async getData(query?:IRequestInjectionQuery) {
    const res = await Http.get<IRequestInjectionModel>('/',query);
    return res.data;
  }

  async getDataById(id: string) {
    const res = await Http.get<IRequestInjectionDataModel>(`/${id}`);
    return res.data;
  }

  async createData(data: IRequestInjectionDataModel) {
    const res = await Http.post<IRequestInjectionModel>('/', data);
    return res.data;
  }

  async deleteData(id: string) {
    const res = await Http.delete<IRequestInjectionModel>(`/${id}`);
    return res.data;
  }

  async updateData(id: string, data: IRequestInjectionDataModel) {
    const res = await Http.put<IRequestInjectionModel>(`/${id}`, data);
    return res.data;
  }
}
