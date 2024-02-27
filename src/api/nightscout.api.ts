import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { INightscoutProfile, INsEntry } from '../definitions/nightscout/index.js';

export class NightscoutApi {
  private readonly _axios: AxiosInstance;

  constructor(baseUrl: string, token: string, config?: AxiosRequestConfig) {
    this._axios = axios.create({
      baseURL: `${baseUrl}/api/v1/`,
      params: {
        token: token,
      },
      ...config
    });
  }

  profile(config?: AxiosRequestConfig<INsEntry[]>): Promise<AxiosResponse<INightscoutProfile[]>> {
    return this._axios.get('profile.json', config);
  }

  entries(config?: AxiosRequestConfig<INsEntry[]>): Promise<AxiosResponse<INsEntry[]>> {
    return this._axios.get('entries.json', config);
  }

  treatments(config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this._axios.get('treatments.json', config);
  }
}
