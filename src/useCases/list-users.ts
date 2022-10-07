import { UseCase } from '../infra/types/useCase';
import { CreateResponse } from '../infra/utils/create-reponse';
import { GithubService } from '../services/github-service';
import { NEXT_LINK_REGEX } from '../shared/constants/regex';
import { routeMapping } from '../shared/constants/route';
import { BASE_PROJECT_URL } from '../shared/constants/url';

type Params = {
  since?: number;
};

export class ListUsersUseCase implements UseCase<Params> {
  constructor(private readonly githubService: GithubService) {}

  async handle(params: Params) {
    const { since } = params;

    const { users, next } = await this.githubService.listUsers(since);

    const nextPage = this.getNextPage(next);

    const nextPageLink = nextPage
      ? `${BASE_PROJECT_URL}${routeMapping.listUsers}?since=${nextPage}`
      : undefined;

    const extraData = {
      metadata: {
        results: users.length,
        nextPage,
        nextPageLink,
      },
    };

    return CreateResponse.ok(undefined, users, extraData);
  }

  private getNextPage(url: string) {
    return url.match(NEXT_LINK_REGEX)?.groups?.since ?? undefined;
  }
}
