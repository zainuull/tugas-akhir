import { IDashboardDataModel } from '../model/model';
import { Repository } from '../repository/repository';

export class CreateDataUseCase {
  constructor(private Repo: Repository) {}

  async invoke(data: IDashboardDataModel) {
    return this.Repo.createData(data);
  }
}
