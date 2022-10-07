type HttpStatus = 200 | 201;

export type HttpResponse = {
  status: HttpStatus;
  success: boolean;
  data?: unknown;
  extraData?: Record<string, unknown>;
  message?: string;
};
