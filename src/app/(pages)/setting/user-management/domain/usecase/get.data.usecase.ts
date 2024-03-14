import { IRequestInjectionQuery } from '../model/model';
import { Repository } from '../repository/repository';

export class GetDataUseCase {
  constructor(private Repo: Repository) {}

  async invoke(query?:IRequestInjectionQuery) {
    return this.Repo.getData(query);
  }
}