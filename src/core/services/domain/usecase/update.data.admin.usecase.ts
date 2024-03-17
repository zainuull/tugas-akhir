import { IDataAdmin } from '../model/IParticipant';
import { Repository } from '../repository/repository';

export class UpdateDataAdminUseCase {
  constructor(private Repo: Repository) {}

  async invoke(id: string, data: IDataAdmin) {
    return this.Repo.updateDataAdmin(id, data);
  }
}
