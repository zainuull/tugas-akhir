import { IRequestActivationDataModel } from '../model/model';
import { Repository } from '../repository/repository';

export class VerifyFileUseCase {
  constructor(private Repo: Repository) {}

  async invoke(id: number, data: any) {
    return this.Repo.verifyFile(id, data);
  }
}
