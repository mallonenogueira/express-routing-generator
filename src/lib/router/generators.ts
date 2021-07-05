import { Handlers, Methods, IRequest, IRoute } from "..";

function Method(method: Methods, path: string, ...handlers: Handlers[]) {
  return function (
    _target: any,
    _propertyName: string,
    _descriptor: PropertyDescriptor
  ) {
    const data: IRequest = {
      method,
      path,
      property: _propertyName,
      handlers,
    };

    Reflect.defineMetadata(`method:${method}:${path}`, data, _target);
  };
}

export function Get(path: string, ...handlers: Handlers[]) {
  return Method("get", path, ...handlers);
}

export function Post(path: string, ...handlers: Handlers[]) {
  return Method("post", path, ...handlers);
}

export function Route(path: string, ...handlers: Handlers[]): ClassDecorator {
  return (target) => {
    const data: IRoute = {
      path,
      handlers,
    };

    Reflect.defineMetadata("route", data, target.prototype);
  };
}
