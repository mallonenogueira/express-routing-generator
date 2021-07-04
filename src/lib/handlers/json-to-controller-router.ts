import { NextFunction, Router, Request, Response } from "express";
import { IController, IRequest } from "src/lib/types";

class RequestHandler {
  public controller: IController;
  public request: IRequest;

  constructor(controller: IController, request: IRequest) {
    this.controller = controller;
    this.request = request;
    this.handler = this.handler.bind(this);
  }

  async handler(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.controller[this.request.property](req, res, next);

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

export function jsonToControllerRouter(
  router: Router,
  controller: IController,
  request: IRequest
) {
  router[request.method](
    request.path,
    ...request.handlers,
    new RequestHandler(controller, request).handler
  );
}
