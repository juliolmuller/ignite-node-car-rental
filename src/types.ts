import { Request, Response } from 'express';

export interface IController {
  handle: (request: Request, response: Response) => void;
}

export interface IService<TOutput = void, TInput = void> {
  execute: (data: TInput) => TOutput;
}
