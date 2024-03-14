import { Repository } from '../repository/repository';

export class GetEndUserUseCase {
  constructor(private repo: Repository) {}

  async invoke() {
    return this.repo.getEndUser();
  }
}
