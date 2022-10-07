import { HttpResponse } from '../types/http';

export class CreateResponse {
  static ok(message?: string, data?: unknown, extraData?: Record<string, unknown>): HttpResponse {
    return {
      status: 200,
      success: true,
      message,
      data,
      extraData,
    };
  }
}
