import { Request, Response } from 'express';

export interface IController {
  handle: (request: Request, response: Response) => Promise<void>;
}

export interface IService<TOutput = void, TInput = void> {
  execute: (data: TInput) => Promise<TOutput>;
}
