import { Http } from '@/core/services/http/http.client';
import { IDataParticipant, IRequestInjectionDataModel, IRequestInjectionModel, IRequestInjectionQuery } from '../../domain/model/model';
import { Repository } from '../../domain/repository/repository';

export default class ApiDataSourceImpl implements Repository {
  async getData(query?: IDataParticipant) {
    const res = await Http.get<IRequestInjectionModel>('/api/participant', query);
    return res.data;
  }

  async getDataById(id: string) {
    const res = await Http.get<IRequestInjectionDataModel>(`/api/participant/${id}`);
    return res.data;
  }

  async createData(data: IRequestInjectionDataModel) {
    const res = await Http.post<IRequestInjectionModel>('/api/participant', data);
    return res.data;
  }

  async deleteData(id: string) {
    const res = await Http.delete<IRequestInjectionModel>(`/api/participant/${id}`);
    return res.data;
  }

  async updateData(id: string, data: IRequestInjectionDataModel) {
    const res = await Http.put<IRequestInjectionModel>(`/api/participant/${id}`, data);
    return res.data;
  }
}
