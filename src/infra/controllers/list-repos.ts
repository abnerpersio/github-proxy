import { GithubService } from '../../services/github-service';
import { ListReposUseCase } from '../../useCases/list-repos';

export class ListReposController {
  static create() {
    const service = new GithubService();
    return new ListReposUseCase(service);
  }
}
