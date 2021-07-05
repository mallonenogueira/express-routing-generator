import { Router } from "express";

import { resolveController } from "./resolve-controller";
import { addToControllerRouter } from "./add-to-controller-router";
import { addToParentRouter } from "./add-to-parent-router";
import { CreateRoutesParams, IController, IRequest, IRoute } from "..";

function getMethodMetadatas(target: Function) {
  return Reflect.getMetadataKeys(target.prototype)
    .filter((key: string) => key.startsWith("method:"))
    .map(
      (key: string) => Reflect.getMetadata(key, target.prototype) as IRequest
    );
}

function getRouteMetadata(target: Function): IRoute {
  return Reflect.getMetadata("route", target.prototype) as IRoute;
}

function createControllerRouter(
  metadatas: IRequest[],
  controller: IController,
  addToController: typeof addToControllerRouter
) {
  return metadatas.reduce((router, data) => {
    addToController(router, controller, data);

    return router;
  }, Router());
}

const defaultParams = {
  addToParentRouter,
  addToControllerRouter,
  resolveController,
};

export function createRoutes(params: CreateRoutesParams = {}) {
  const appRouter = Router();
  const {
    controllers,
    addToParentRouter,
    addToControllerRouter,
    resolveController,
  } = { ...defaultParams, ...params };

  controllers?.forEach((target) => {
    const metadatas = getMethodMetadatas(target);
    const route = getRouteMetadata(target);
    const controller = resolveController(target);

    const controllerRouter = createControllerRouter(
      metadatas,
      controller,
      addToControllerRouter
    );

    addToParentRouter(appRouter, controllerRouter, route);
  });

  return appRouter;
}
