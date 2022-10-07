import { MockedRequest, RestContext, rest } from 'msw';
import { setupServer } from 'msw/node';

import { reposDB } from '../fixtures/repos';
import { userDetailsDB } from '../fixtures/user-details';
import { usersDB } from '../fixtures/users';

const notFoundMessage = {
  message: 'Not Found',
  documentation_url: 'https://docs.github.com/rest/reference/users#get-a-user',
};

export const handlers = setupServer(
  rest.get('https://api.github.com/users', (req: MockedRequest, res, ctx: RestContext) => {
    const param = req.url.searchParams.get('since');
    const since = param ? parseInt(param) : 0;

    const perPage = 30;
    const results = usersDB.filter(({ id }) => id > since).slice(0, perPage);
    const lastResult = results[results.length - 1];

    const nextPage = lastResult.id;
    const linkToNext = `<https://api.github.com/users?since=${nextPage}>; rel="next", <https://api.github.com/users{?since}>; rel="first"`;

    return res(ctx.status(200), ctx.json(results), ctx.set('link', linkToNext));
  }),
  rest.get(
    'https://api.github.com/users/:username',
    (req: MockedRequest, res, ctx: RestContext) => {
      const { username } = (req as any).params;

      const user = userDetailsDB.find(({ login }) => login === username);

      if (!user) return res(ctx.status(404), ctx.json(notFoundMessage));

      return res(ctx.status(200), ctx.json(user));
    },
  ),
  rest.get(
    'https://api.github.com/users/:username/repos',
    (req: MockedRequest, res, ctx: RestContext) => {
      const { username } = (req as any).params;

      const user = reposDB.find(({ username: usernameRepo }) => usernameRepo === username);

      if (!user) return res(ctx.status(404), ctx.json(notFoundMessage));

      return res(ctx.status(200), ctx.json(user.repos));
    },
  ),
);
