import { IStatusDataModel } from '../model/model';
import { Repository } from '../repository/repository';

export class CreateDataUseCase {
  constructor(private Repo: Repository) {}

  async invoke(data: IStatusDataModel) {
    return this.Repo.createData(data);
  }
}
