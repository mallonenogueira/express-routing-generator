import { NextFunction, Router, Request, Response } from "express";

export type Methods =
  | "all"
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

export type Middleware = <T>(
  req: Request,
  res: Response,
  next: NextFunction
) => T | void;

export interface IRequest {
  method: Methods;
  path: string;
  property: string;
  middlewares: Middleware[];
}

export interface IRoute {
  path: string;
  middlewares: Middleware[];
}

export interface IController {
  [index: string]: any;
  new (...params: any[]): any;
}

export type CreateRoutesParams = {
  controllers?: IController[];
  addToParentRouter?: (
    appRoute: Router,
    controllerRouter: Router,
    parentData: IRoute
  ) => void;
  addToControllerRouter?: (
    router: Router,
    controller: IController,
    request: IRequest
  ) => void;
  resolveController?: (target: Function) => IController;
};
