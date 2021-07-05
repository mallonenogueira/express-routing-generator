import {
  Handlers,
  Methods,
  IRequest,
  IRoute,
  IInject,
  InjectEnum,
  InjectionToken,
} from "./types";

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

export function inject(value: InjectionToken): any {
  return function (target: Object, key: string, index: number) {
    Reflect.defineMetadata(
      `inject:${key}:${index}`,
      { index, value, propertyKey: key } as IInject,
      target,
      key
    );
  };
}

export const Req = inject(InjectEnum.REQUEST);

export const Res = inject(InjectEnum.RESPONSE);

export const Next = inject(InjectEnum.NEXT);

export const Param = (param: string) =>
  inject(`${InjectEnum.REQUEST_PARAM}params:${param}`);

export const Body = inject(`${InjectEnum.REQUEST_PARAM}body`);
