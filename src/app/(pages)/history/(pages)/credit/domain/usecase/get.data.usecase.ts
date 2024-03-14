import { IStatusQuery } from '../model/model';
import { Repository } from '../repository/repository';

export class GetDataUseCase {
  constructor(private Repo: Repository) {}

  async invoke(query?:IStatusQuery) {
    return this.Repo.getData(query);
  }
}
