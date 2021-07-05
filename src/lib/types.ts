import { NextFunction, Request, Response } from "express";

export type Methods = "get" | "post";
export type InjectionToken = any;

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
  value: InjectionToken;
  propertyKey: string;
}

export enum InjectEnum {
  REQUEST = "Request",
  RESPONSE = "Response",
  NEXT = "Next",
  REQUEST_PARAM = "RequestParam:",
}
