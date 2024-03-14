import { Http } from '@/core/services/http/http.client';
import { IRequestCreditDataModel, IRequestCreditModel, IRequestCreditQuery } from '../../domain/model/model';
import { Repository } from '../../domain/repository/repository';

export default class ApiDataSourceImpl implements Repository {
  async getData(query?:IRequestCreditQuery) {
    const res = await Http.get<IRequestCreditModel>('/',query);
    return res.data;
  }

  async getDataById(id: string) {
    const res = await Http.get<IRequestCreditDataModel>(`/${id}`);
    return res.data;
  }

  async createData(data: IRequestCreditDataModel) {
    const res = await Http.post<IRequestCreditModel>('/', data);
    return res.data;
  }

  async deleteData(id: string) {
    const res = await Http.delete<IRequestCreditModel>(`/${id}`);
    return res.data;
  }

  async updateData(id: string, data: IRequestCreditDataModel) {
    const res = await Http.put<IRequestCreditModel>(`/${id}`, data);
    return res.data;
  }
}
