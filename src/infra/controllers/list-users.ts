import { GithubService } from '../../services/github-service';
import { ListUsersUseCase } from '../../useCases/list-users';

export class ListUsersController {
  static create() {
    const service = new GithubService();
    return new ListUsersUseCase(service);
  }
}
