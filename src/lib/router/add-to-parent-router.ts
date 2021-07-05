import { Router } from "express";
import { IRoute } from ".";

export function addToParentRouter(
  appRoute: Router,
  controllerRouter: Router,
  parentData: IRoute
) {
  appRoute.use(parentData.path, ...parentData.middlewares, controllerRouter);
}
