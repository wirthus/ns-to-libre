export interface ILibreResponseSuccess<T = any> {
  status: number;
  result: T;
}

export interface ILibreResponseError {
  status: number;
  reason: string;
}

export type ILibreResponse<T = any> = ILibreResponseSuccess<T> | ILibreResponseError;

export function isResponseError(data: ILibreResponse): data is ILibreResponseError {
  return 'reason' in data;
}

export function isResponseSuccess(data: ILibreResponse): data is ILibreResponseSuccess {
  return 'result' in data;
}
