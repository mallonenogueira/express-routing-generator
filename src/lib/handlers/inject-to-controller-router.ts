import { NextFunction, Router, Request, Response } from "express";
import { IController, IRequest, IInject } from "../types";

class RequestHandler {
  public controller: IController;
  public request: IRequest;

  constructor(controller: IController, request: IRequest) {
    this.controller = controller;
    this.request = request;
    this.handler = this.handler.bind(this);
  }

  async handler(req: Request, res: Response, next: NextFunction) {
    res.locals.container.register("Request", { useValue: req });
    res.locals.container.register("Response", { useValue: res });
    res.locals.container.register("Next", { useValue: next });

    const params = Reflect.getMetadataKeys(
      this.controller,
      this.request.property
    )
      .filter((key: string) => key.startsWith("inject:"))
      .sort()
      .map(
        (key: string) =>
          Reflect.getMetadata(
            key,
            this.controller,
            this.request.property
          ) as IInject
      )
      .map((data) => res.locals.container.resolve(data.value));

    this.controller[this.request.property].call(this.controller, ...params);
  }
}

export function injectToControllerRouter(
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
