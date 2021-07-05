import { IInject, InjectEnum, InjectionToken } from "./types";

export const inject =
  (value: InjectionToken): any =>
  (target: Object, key: string, index: number) =>
    Reflect.defineMetadata(
      `inject:${index}`,
      { index, value, propertyKey: key } as IInject,
      target,
      key
    );

export const Req = inject(InjectEnum.REQUEST);

export const Res = inject(InjectEnum.RESPONSE);

export const Next = inject(InjectEnum.NEXT);

export const Param = (param: string) =>
  inject(`${InjectEnum.REQUEST_PARAM}params:${param}`);

export const Body = inject(`${InjectEnum.REQUEST_PARAM}body`);
