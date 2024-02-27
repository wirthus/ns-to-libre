import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import {
  ILibreAuthData as ILibreAuthRequest,
  ILibreAuthResult,
  ILibreMeasurementsRequest,
  ILibreMeasurementsResult,
  ILibreResponse,
  isResponseError,
} from '../definitions/libre/index.js';

export class LibreApi {
  private readonly _axios: AxiosInstance;

  constructor(baseUrl: string, config?: AxiosRequestConfig) {
    this._axios = axios.create({
      baseURL: `${baseUrl}/lsl/api/`,
      ...config
    });
  }

  async auth(data: ILibreAuthRequest): Promise<string | undefined> {
    const { data: responseData } = await this._axios.post<ILibreResponse<ILibreAuthResult>>('nisperson/getauthentication', data);
    if (isResponseError(responseData)) {
      throw new Error(`LibreView authentication failed: ${responseData.reason}`);
    }

    return responseData.result.UserToken;
  }

  async sendMeasurements(data: ILibreMeasurementsRequest): Promise<ILibreMeasurementsResult> {
    const { data: responseData } = await this._axios.post<ILibreResponse<ILibreMeasurementsResult>>('measurements', data);
    if (isResponseError(responseData)) {
      throw new Error(`LibreView transfer failed: ${responseData.reason}`);
    }

    return responseData.result;
  }
}
