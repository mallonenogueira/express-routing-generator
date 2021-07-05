export type InjectionToken = any;

export interface IInject {
  index: number;
  value: InjectionToken;
  propertyKey: string;
}

export enum INJECT {
  Request = "Request",
  Response = "Response",
  Next = "Next",
  RequestParam = "RequestParam:",
}
