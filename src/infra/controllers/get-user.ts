import { GithubService } from '../../services/github-service';
import { GetUserUseCase } from '../../useCases/get-user';

export class GetUserController {
  static create() {
    const service = new GithubService();
    return new GetUserUseCase(service);
  }
}
