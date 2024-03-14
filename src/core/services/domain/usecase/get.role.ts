import { Repository } from '../repository/repository';

export class GetRoleUseCase {
  constructor(private repo: Repository) {}

  async invoke() {
    return this.repo.getRole();
  }
}
