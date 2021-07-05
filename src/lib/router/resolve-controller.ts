import { IController } from "..";

export function resolveController(target: Function): IController {
  const controller = target as IController;

  return new controller();
}
