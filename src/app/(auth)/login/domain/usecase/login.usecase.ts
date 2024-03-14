import { IUserContextModel } from '../model/model';
import { Repository } from '../repository/repository';

export class LoginUseCase {
  constructor(private Repo: Repository) {}

  async invoke(data: IUserContextModel) {
    return this.Repo.loginData(data);
  }
}
