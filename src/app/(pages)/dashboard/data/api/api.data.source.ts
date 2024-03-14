import { Http } from '@/core/services/http/http.client';
import { IDashboardDataModel, IDashboardModel } from '../../domain/model/model';
import { Repository } from '../../domain/repository/repository';

export default class ApiDataSourceImpl implements Repository {
  async getData() {
    const res = await Http.get<IDashboardModel>('/');
    return res.data;
  }

  async getDataById(id: string) {
    const res = await Http.get<IDashboardDataModel>(`/${id}`);
    return res.data;
  }

  async createData(data: IDashboardDataModel) {
    const res = await Http.post<IDashboardModel>('/', data);
    return res.data;
  }

  async deleteData(id: string) {
    const res = await Http.delete<IDashboardModel>(`/${id}`);
    return res.data;
  }

  async updateData(id: string, data: IDashboardDataModel) {
    const res = await Http.put<IDashboardModel>(`/${id}`, data);
    return res.data;
  }
}
