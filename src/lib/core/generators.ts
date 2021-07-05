import { Middleware, Methods, IRequest, IRoute } from "..";

const requestGenerator =
  (method: Methods) =>
  (path: string, ...middlewares: Middleware[]) =>
  (_target: any, _propertyName: string, _descriptor: PropertyDescriptor) => {
    const data: IRequest = {
      method,
      path,
      property: _propertyName,
      middlewares,
    };

    Reflect.defineMetadata(`method:${method}:${path}`, data, _target);
  };

export const All = requestGenerator("all");
export const Get = requestGenerator("get");
export const Post = requestGenerator("post");
export const Put = requestGenerator("put");
export const Delete = requestGenerator("delete");
export const Patch = requestGenerator("patch");
export const Options = requestGenerator("options");
export const Head = requestGenerator("head");

export const Route =
  (path: string, ...middlewares: Middleware[]): ClassDecorator =>
  (target) => {
    const data: IRoute = {
      path,
      middlewares,
    };

    Reflect.defineMetadata("route", data, target.prototype);
  };
