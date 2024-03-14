import { IRequestCreditQuery } from '../model/model';
import { Repository } from '../repository/repository';

export class GetDataUseCase {
  constructor(private Repo: Repository) {}

  async invoke(query?:IRequestCreditQuery) {
    return this.Repo.getData(query);
  }
}
