import { IController } from "../types";

export function createController(target: Function): IController {
  const controller = target as IController;

  return new controller();
}
