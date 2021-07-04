import { IMethodData, IRouteData } from "./types";
import { Route } from "./generators";

export function getMethodMetadatas(target: Function) {
  return Reflect.getMetadataKeys(target.prototype)
    .filter((key: string) => key.startsWith("method:"))
    .map(
      (key: string) => Reflect.getMetadata(key, target.prototype) as IMethodData
    );
}

export function getRouteMetadata(target: Function): IRouteData {
  return Reflect.getMetadata("route", target.prototype) as IRouteData;
}

export function getControllers(): Function[] {
  return Reflect.getMetadata("controllers", Route.prototype);
}
