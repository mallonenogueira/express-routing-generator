import { Router } from "express";
import { getMethodMetadatas, getRouteMetadata } from "./getters";
import { createController } from "./handlers/create-controller";
import { addToControllerRouter } from "./handlers/add-to-controller-router";
import { addToParentRouter } from "./handlers/add-to-parent-router";
import { IController, IRequest as IRequest } from "./types";

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

type Params = {
  controllers?: IController[];
  addToParentRouter?: typeof addToParentRouter;
  addToControllerRouter?: typeof addToControllerRouter;
  createController?: typeof createController;
};

const defaultParams = {
  controllers: [],
  addToParentRouter,
  addToControllerRouter,
  createController,
};

export function createRoutes(params: Params = {}) {
  const appRouter = Router();
  const {
    controllers,
    addToParentRouter,
    addToControllerRouter,
    createController,
  } = { ...defaultParams, ...params };

  controllers.forEach((target) => {
    const metadatas = getMethodMetadatas(target);
    const controller = createController(target);
    const route = getRouteMetadata(target);

    const controllerRouter = createControllerRouter(
      metadatas,
      controller,
      addToControllerRouter
    );

    addToParentRouter(appRouter, controllerRouter, route);
  });

  return appRouter;
}
