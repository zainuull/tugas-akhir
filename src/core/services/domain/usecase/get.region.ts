import { Repository } from '../repository/repository';

export class GetRegionUseCase {
  constructor(private repo: Repository) {}

  async invoke() {
    return this.repo.getRegion();
  }
}
