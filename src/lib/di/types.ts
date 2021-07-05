export type InjectionToken = any;

export interface IInject {
  index: number;
  value: InjectionToken;
  propertyKey: string;
}

export enum InjectEnum {
  REQUEST = "Request",
  RESPONSE = "Response",
  NEXT = "Next",
  REQUEST_PARAM = "RequestParam:",
}
