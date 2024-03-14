import { IRequestInjectionDataModel } from '../model/model';
import { Repository } from '../repository/repository';

export class CreateDataUseCase {
  constructor(private Repo: Repository) {}

  async invoke(data: IRequestInjectionDataModel) {
    return this.Repo.createData(data);
  }
}
