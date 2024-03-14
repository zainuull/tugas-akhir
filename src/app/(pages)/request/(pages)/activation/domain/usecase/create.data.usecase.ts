import { IRequestActivationDataModel } from '../model/model';
import { Repository } from '../repository/repository';

export class CreateDataUseCase {
  constructor(private Repo: Repository) {}

  async invoke(data: IRequestActivationDataModel) {
    return this.Repo.createData(data);
  }
}
