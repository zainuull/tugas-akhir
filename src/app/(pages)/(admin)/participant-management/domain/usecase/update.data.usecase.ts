import { IDataParticipant } from '../model/model';
import { Repository } from '../repository/repository';

export class UpdateDataUseCase {
  constructor(private Repo: Repository) {}

  async invoke(id: string, data: IDataParticipant) {
    return this.Repo.updateData(id, data);
  }
}
