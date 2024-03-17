import { Repository } from '../repository/repository';

export class GetDataAdminByIdUseCase {
  constructor(private Repo: Repository) {}

  async invoke(id: string) {
    return this.Repo.getDataAdminById(id);
  }
}
