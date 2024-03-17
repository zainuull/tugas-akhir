import { Http } from '@/core/services/http/http.client';
import { Repository } from '../../domain/repository/repository';
import {
  IAdmin,
  IDataAdmin,
  IDataParticipant,
  IParticipant,
} from '../../domain/model/IParticipant';

export default class CoreAPIDataSourceImpl implements Repository {
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

  //admin
  async getDataAdmin(query?: IDataAdmin) {
    const res = await Http.get<IAdmin>('/api/users', query);
    return res.data;
  }

  async getDataAdminById(id: string) {
    const res = await Http.get<IAdmin>(`/api/users/${id}`);
    return res.data;
  }

  async createDataAdmin(data: IDataAdmin) {
    console.log(data);

    const res = await Http.post<IAdmin>('/api/users', data);
    console.log(res.data);

    return res.data;
  }

  async deleteDataAdmin(id: string) {
    const res = await Http.delete<IAdmin>(`/api/users/${id}`);
    return res.data;
  }

  async updateDataAdmin(id: string, data: IDataAdmin) {
    console.log(data);

    const res = await Http.put<IAdmin>(`/api/users/${id}`, data);
    return res.data;
  }
}
