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

    const { users, nextPageLink } = await this.githubService.listUsers(since);

    const extraData = {
      metadata: {
        results: users.length,
        nextPage: this.getNextLink(nextPageLink),
      },
    };

    return CreateResponse.ok(undefined, users, extraData);
  }

  private getNextLink(url: string) {
    const endpoint = `${BASE_PROJECT_URL}${routeMapping.listUsers}`;

    if (!url.match(NEXT_LINK_REGEX)) return endpoint;

    const since = url.match(NEXT_LINK_REGEX)?.groups?.since;
    if (!since) return endpoint;

    return `${endpoint}?since=${since}`;
  }
}
