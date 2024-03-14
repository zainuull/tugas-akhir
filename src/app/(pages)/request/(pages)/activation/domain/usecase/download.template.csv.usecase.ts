import { IRequestActivationQuery } from '../model/model';
import { Repository } from '../repository/repository';

export class DownloadTemplateCSVUseCase {
  constructor(private Repo: Repository) {}

  async invoke() {
    return this.Repo.downloadTemplateCSV();
  }
}
