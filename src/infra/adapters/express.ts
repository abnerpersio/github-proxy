import { Request, Response } from 'express';

import { UseCase } from '../types/useCase';

export class ExpressAdapter<T = unknown> {
  constructor(private readonly useCase: UseCase<T>) {}

  adapt = async (
    req: Request<Partial<T>, unknown, Partial<T>, Partial<T>>,
    res: Response,
  ): Promise<Response> => {
    const input = { ...req.body, ...req.query, ...req.params };

    const {
      status,
      success,
      data,
      extraData = {},
      message,
    } = await this.useCase.handle(input as T);

    if (!data && !message) return res.sendStatus(status);

    return res.status(status).json({
      success,
      data: data ?? undefined,
      message: message ?? undefined,
      ...extraData,
    });
  };
}
