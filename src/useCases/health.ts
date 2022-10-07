import { UseCase } from '../infra/types/useCase';
import { CreateResponse } from '../infra/utils/create-reponse';

export class HealthUseCase implements UseCase {
  async handle() {
    return CreateResponse.ok('Everything is OK here!');
  }
}
