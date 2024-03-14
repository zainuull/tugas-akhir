import { Http } from '@/core/services/http/http.client';
import {
  IRequestActivationDataModel,
  IRequestActivationModel,
  IRequestActivationQuery,
} from '../../domain/model/model';
import { Repository } from '../../domain/repository/repository';

export default class ApiDataSourceImpl implements Repository {
  async getData(query?: IRequestActivationQuery) {
    const res = await Http.get<IRequestActivationModel>('/card/activable', query);
    return res.data;
  }

  async getDataById(id: string) {
    const res = await Http.get<IRequestActivationDataModel>(`/${id}`);
    return res.data;
  }

  async createData(data: IRequestActivationDataModel) {
    const res = await Http.post<IRequestActivationModel>('/', data);
    return res.data;
  }

  async deleteData(id: string) {
    const res = await Http.delete<IRequestActivationModel>(`/${id}`);
    return res.data;
  }

  async updateData(id: string, data: IRequestActivationDataModel) {
    const res = await Http.put<IRequestActivationModel>(`/${id}`, data);
    return res.data;
  }

  async verifyFile(id: number, data: any) {
    const res = await Http.post<IRequestActivationModel>('/activation/verify-file', id, data);
    return res.data;
  }

  async downloadTemplateCSV() {
    const res = await Http.get<IRequestActivationModel>('/activation/download/template/csv');
    return res.data;
  }
}
