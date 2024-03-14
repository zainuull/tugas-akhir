import { Repository } from '../repository/repository';

export class GetOperatorUseCase {
  constructor(private repo: Repository) {}

  async invoke() {
    return this.repo.getOperator();
  }
}
