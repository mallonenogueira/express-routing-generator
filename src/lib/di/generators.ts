import { IInject, INJECT, InjectionToken } from "./types";

export const inject =
  (value: InjectionToken): any =>
  (target: Object, key: string, index: number) =>
    Reflect.defineMetadata(
      `inject:${index}`,
      { index, value, propertyKey: key } as IInject,
      target,
      key
    );

export const Req = inject(INJECT.Request);

export const Res = inject(INJECT.Response);

export const Next = inject(INJECT.Next);

export const Param = (param: string) =>
  inject(`${INJECT.RequestParam}params:${param}`);

export const Body = inject(`${INJECT.RequestParam}body`);
