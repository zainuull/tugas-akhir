import { Repository } from '../repository/repository';

export class DeleteDataAdminUseCase {
  constructor(private Repo: Repository) {}

  async invoke(id: string) {
    return this.Repo.deleteDataAdmin(id);
  }
}
