import { Router } from "express";
import {
  getControllers,
  getMethodMetadatas,
  getRouteMetadata,
} from "./getters";
import { IController, IMethodData } from "./types";

function getControllerInstance(target: Function): IController {
  const controller = target as IController;

  return new controller();
}

function createInternalRouter(
  metadatas: IMethodData[],
  controller: IController
) {
  return metadatas.reduce((router, data) => {
    return router[data.method](
      data.path,
      ...data.handlers,
      controller[data.property].bind(controller)
    );
  }, Router());
}

export function createRoutes(controllers = getControllers()) {
  const appRoute = Router();

  controllers.forEach((target) => {
    const metadatas = getMethodMetadatas(target);
    const controller = getControllerInstance(target);
    const { path, handlers } = getRouteMetadata(target);

    const router = createInternalRouter(metadatas, controller);

    appRoute.use(path, ...handlers, router);
  });

  return appRoute;
}
