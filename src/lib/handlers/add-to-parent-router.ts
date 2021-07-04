import { Router } from "express";
import { IRoute } from "../types";

export function addToParentRouter(
  appRoute: Router,
  controllerRouter: Router,
  parentData: IRoute
) {
  appRoute.use(parentData.path, ...parentData.handlers, controllerRouter);
}
