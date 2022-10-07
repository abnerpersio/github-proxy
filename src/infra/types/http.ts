type HttpStatus = 200;

export type HttpResponse = {
  status: HttpStatus;
  success: boolean;
  data?: unknown;
  extraData?: Record<string, unknown>;
  message?: string;
};
