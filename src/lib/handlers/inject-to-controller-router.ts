import { NextFunction, Router, Request, Response } from "express";
import { IController, IRequest, IInject, InjectEnum } from "../types";

type HandleContainer = (req: Request, res: Response, value: any) => any;
const PARAMS = `${InjectEnum.REQUEST_PARAM}params:`;

class RequestHandler {
  public controller: IController;
  public request: IRequest;
  public resolveContainer: HandleContainer;

  constructor(
    controller: IController,
    request: IRequest,
    handle: HandleContainer
  ) {
    this.controller = controller;
    this.request = request;
    this.resolveContainer = handle;
    this.handler = this.handler.bind(this);
  }

  async handler(req: Request, res: Response, next: NextFunction) {
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
      .map(handleInjectParameters(req, res, next, this.resolveContainer));

    this.controller[this.request.property].call(this.controller, ...params);
  }
}

function handleInjectParameters(
  req: Request,
  res: Response,
  next: NextFunction,
  resolveContainer: HandleContainer
): (value: IInject) => any {
  return ({ value }) => {
    const stringValue = typeof value === "string" && value.toString();

    if (stringValue && stringValue.startsWith(PARAMS))
      return req.params[stringValue.replace(PARAMS, "")];

    if (stringValue && stringValue.startsWith(InjectEnum.REQUEST_PARAM))
      return (req as any)[stringValue.replace(InjectEnum.REQUEST_PARAM, "")];

    if (stringValue === InjectEnum.NEXT) return next;
    if (stringValue === InjectEnum.RESPONSE) return res;
    if (stringValue === InjectEnum.REQUEST) return req;

    return resolveContainer(req, res, value);
  };
}

export const injectToControllerRouter =
  (resolveContainer: HandleContainer) =>
  (router: Router, controller: IController, request: IRequest) =>
    router[request.method](
      request.path,
      ...request.handlers,
      new RequestHandler(controller, request, resolveContainer).handler
    );
