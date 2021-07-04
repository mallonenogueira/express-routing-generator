import { NextFunction, Request, Response } from "express";
import { InjectionToken } from "tsyringe";

export type Methods = "get" | "post";

export type Handlers = <T>(
  req: Request,
  res: Response,
  next: NextFunction
) => T | void;

export interface IRequest {
  method: Methods;
  path: string;
  property: string;
  handlers: Handlers[];
}

export interface IRoute {
  path: string;
  handlers: Handlers[];
}

export interface IController {
  [index: string]: any;
  new (...params: any[]): any;
}

export interface IInject {
  index: number;
  value: InjectionToken<any>;
  propertyKey: string;
}
