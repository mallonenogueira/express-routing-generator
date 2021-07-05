import { IController } from ".";

export function createController(target: Function): IController {
  const controller = target as IController;

  return new controller();
}
