import { IDataAdmin } from '../model/IParticipant';
import { Repository } from '../repository/repository';

export class CreateDataAdminUseCase {
  constructor(private Repo: Repository) {}

  async invoke(data: IDataAdmin) {
    return this.Repo.createDataAdmin(data);
  }
}
