import { IDataAdmin } from '../model/IParticipant';
import { Repository } from '../repository/repository';

export class GetDataAdminUseCase {
  constructor(private Repo: Repository) {}

  async invoke(query?: IDataAdmin) {
    return this.Repo.getDataAdmin(query);
  }
}
