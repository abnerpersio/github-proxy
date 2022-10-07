import { HttpResponse } from './http';

export interface UseCase<T = unknown> {
  handle: (params: T) => Promise<HttpResponse>;
}
