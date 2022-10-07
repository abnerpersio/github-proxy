import { Router } from 'express';

import { ExpressAdapter } from './infra/adapters/express';
import { GetUserController } from './infra/controllers/get-user';
import { ListReposController } from './infra/controllers/list-repos';
import { ListUsersController } from './infra/controllers/list-users';
import { routeMapping } from './shared/constants/route';
import { HealthUseCase } from './useCases/health';

export const routes = Router();

routes.get(['/', '/health', '/ping'], new ExpressAdapter(new HealthUseCase()).adapt);

routes.get(routeMapping.listUsers, new ExpressAdapter(ListUsersController.create()).adapt);
routes.get(routeMapping.getUser, new ExpressAdapter(GetUserController.create()).adapt);
routes.get(routeMapping.listRepos, new ExpressAdapter(ListReposController.create()).adapt);
