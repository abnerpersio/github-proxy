import { UseCase } from '../infra/types/useCase';
import { CreateResponse } from '../infra/utils/create-reponse';
import { GithubService } from '../services/github-service';

type Params = {
  username: string;
};

export class GetUserUseCase implements UseCase<Params> {
  constructor(private readonly githubService: GithubService) {}

  async handle(params: Params) {
    const { username } = params;

    const user = await this.githubService.getUser(username);

    return CreateResponse.ok(undefined, user);
  }
}
