import { IRequest, IRoute } from "./types";

export function getMethodMetadatas(target: Function) {
  return Reflect.getMetadataKeys(target.prototype)
    .filter((key: string) => key.startsWith("method:"))
    .map(
      (key: string) => Reflect.getMetadata(key, target.prototype) as IRequest
    );
}

export function getRouteMetadata(target: Function): IRoute {
  return Reflect.getMetadata("route", target.prototype) as IRoute;
}
