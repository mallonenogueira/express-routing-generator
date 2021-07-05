export interface IController {
  [index: string]: any;
  new (...params: any[]): any;
}
