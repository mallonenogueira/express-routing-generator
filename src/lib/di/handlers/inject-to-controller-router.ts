import { NextFunction, Router, Request, Response } from "express";
import { IController } from "../../types";
import { IRequest } from "../../router/types";
import { IInject, InjectEnum } from "../types";

type HandleContainer = (req: Request, res: Response, value: any) => any;

const PARAMS = `${InjectEnum.REQUEST_PARAM}params:`;

type InjectMap = {
  paramType: any;
  inject?: IInject;
};

class RequestHandler {
  public controller: IController;
  public request: IRequest;
  public resolveInjection: HandleContainer;

  constructor(
    controller: IController,
    request: IRequest,
    resolveInjection: HandleContainer
  ) {
    this.controller = controller;
    this.request = request;
    this.resolveInjection = resolveInjection;
    this.handler = this.handler.bind(this);
  }

  handleInject(
    req: Request,
    res: Response,
    next: NextFunction,
    resolveInjection: HandleContainer
  ): ({ paramType, inject }: InjectMap) => any {
    return ({ paramType, inject }) => {
      if (!inject || !inject.value) {
        return resolveInjection(req, res, paramType);
      }

      const { value } = inject;

      const stringValue = typeof value === "string" && value.toString();

      if (stringValue && stringValue.startsWith(PARAMS))
        return req.params[stringValue.replace(PARAMS, "")];

      if (stringValue && stringValue.startsWith(InjectEnum.REQUEST_PARAM))
        return (req as any)[stringValue.replace(InjectEnum.REQUEST_PARAM, "")];

      if (stringValue === InjectEnum.NEXT) return next;
      if (stringValue === InjectEnum.RESPONSE) return res;
      if (stringValue === InjectEnum.REQUEST) return req;

      return resolveInjection(req, res, value);
    };
  }

  async handler(req: Request, res: Response, next: NextFunction) {
    const params = Reflect.getMetadata(
      "design:paramtypes",
      this.controller,
      this.request.property
    )
      .map((paramType: any, index: number) => ({
        paramType,
        inject: Reflect.getMetadata(
          `inject:${index}`,
          this.controller,
          this.request.property
        ),
      }))
      .map(this.handleInject(req, res, next, this.resolveInjection));

    try {
      await this.controller[this.request.property].call(
        this.controller,
        ...params
      );
    } catch (error) {
      next(error);
    }
  }
}

export const injectToControllerRouter =
  (resolveInjection: HandleContainer) =>
  (router: Router, controller: IController, request: IRequest) =>
    router[request.method](
      request.path,
      ...request.handlers,
      new RequestHandler(controller, request, resolveInjection).handler
    );
