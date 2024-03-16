import { IDataParticipant } from '../model/model';
import { Repository } from '../repository/repository';

export class CreateDataUseCase {
  constructor(private Repo: Repository) {}

  async invoke(data: IDataParticipant) {
    return this.Repo.createData(data);
  }
}
