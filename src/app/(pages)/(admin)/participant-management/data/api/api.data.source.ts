import { Http } from '@/core/services/http/http.client';
import {
  IDataParticipant,
  IParticipant,
} from '../../domain/model/model';
import { Repository } from '../../domain/repository/repository';

export default class ApiDataSourceImpl implements Repository {
  async getData(query?: IDataParticipant) {
    const res = await Http.get<IParticipant>('/api/participant', query);
    return res.data;
  }

  async getDataById(id: string) {
    const res = await Http.get<IParticipant>(`/api/participant/${id}`);
    return res.data;
  }

  async createData(data: IDataParticipant) {
    const res = await Http.post<IParticipant>('/api/participant', data);
    return res.data;
  }

  async deleteData(id: string) {
    const res = await Http.delete<IParticipant>(`/api/participant/${id}`);
    return res.data;
  }

  async updateData(id: string, data: IDataParticipant) {
    const res = await Http.put<IParticipant>(`/api/participant/${id}`, data);
    return res.data;
  }
}
