import { UseCase } from '../infra/types/useCase';
import { CreateResponse } from '../infra/utils/create-reponse';
import { GithubService } from '../services/github-service';

type Params = {
  username: string;
};

export class ListReposUseCase implements UseCase<Params> {
  constructor(private readonly githubService: GithubService) {}

  async handle(params: Params) {
    const { username } = params;

    const repos = await this.githubService.listRepos(username);

    return CreateResponse.ok(undefined, repos);
  }
}
