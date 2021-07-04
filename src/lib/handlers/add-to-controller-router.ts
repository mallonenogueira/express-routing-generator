import { Router } from "express";
import { IController, IRequest } from "../types";

export function addToControllerRouter(
  router: Router,
  controller: IController,
  request: IRequest
) {
  router[request.method](
    request.path,
    ...request.handlers,
    controller[request.property].bind(controller)
  );
}
