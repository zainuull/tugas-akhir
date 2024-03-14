import { IRequestCreditQuery } from '../model/model';
import { Repository } from '../repository/repository';

export class GetDataCredit {
  constructor(private Repo: Repository) {}

  async invoke(query?: IRequestCreditQuery) {
    return this.Repo.getDataCredit(query);
  }
}
