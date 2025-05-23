/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum DeviceTypeEnum {
  Web = 'Web',
  Mobile = 'Mobile',
}

export interface AuthRequestModel {
  /**
   * @format email
   * @minLength 1
   */
  email: string;
  /** @minLength 1 */
  password: string;
  device: DeviceTypeEnum;
}

export interface AuthResponseModel {
  accessToken?: string | null;
  /** @format int64 */
  expiresAccessToken?: number;
  refreshToken?: string | null;
  /** @format int64 */
  expiresRefreshToken?: number;
}

export interface AuthResponseModelResultData {
  succeeded?: boolean;
  message?: string | null;
  data?: AuthResponseModel;
}

export interface CreateUserModel {
  /**
   * @minLength 0
   * @maxLength 100
   */
  fullName: string;
  /**
   * @format email
   * @minLength 0
   * @maxLength 150
   */
  email?: string | null;
  /**
   * @minLength 0
   * @maxLength 20
   */
  document?: string | null;
  /** @minLength 1 */
  password: string;
  device: DeviceTypeEnum;
}

export interface ReAuthRequestModel {
  refreshToken?: string | null;
  device: DeviceTypeEnum;
}

export interface StringResultData {
  succeeded?: boolean;
  message?: string | null;
  data?: string | null;
}

export interface UpdatePasswordRequestModel {
  keyCode?: string | null;
  email?: string | null;
  newPassword?: string | null;
}

export interface UserModel {
  fullName?: string | null;
  email?: string | null;
  document?: string | null;
}

export interface UserModelResultData {
  succeeded?: boolean;
  message?: string | null;
  data?: UserModel;
}

export interface AccountPasswordForgotListParams {
  email?: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || '',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Eden Project API
 * @version v1
 *
 * Service for manager Eden Project
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Account
     * @name AccountAuthInfoList
     * @request GET:/api/Account/auth-info
     * @secure
     * @response `200` `UserModelResultData` OK
     */
    accountAuthInfoList: (params: RequestParams = {}) =>
      this.request<UserModelResultData, any>({
        path: `/api/Account/auth-info`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountPasswordForgotList
     * @request GET:/api/Account/password/forgot
     * @secure
     * @response `200` `StringResultData` OK
     */
    accountPasswordForgotList: (
      query: AccountPasswordForgotListParams,
      params: RequestParams = {}
    ) =>
      this.request<StringResultData, any>({
        path: `/api/Account/password/forgot`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountPasswordUpdateCreate
     * @request POST:/api/Account/password/update
     * @secure
     * @response `200` `StringResultData` OK
     */
    accountPasswordUpdateCreate: (data: UpdatePasswordRequestModel, params: RequestParams = {}) =>
      this.request<StringResultData, any>({
        path: `/api/Account/password/update`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountLoginCreate
     * @request POST:/api/Account/login
     * @secure
     * @response `200` `AuthResponseModelResultData` OK
     */
    accountLoginCreate: (data: AuthRequestModel, params: RequestParams = {}) =>
      this.request<AuthResponseModelResultData, any>({
        path: `/api/Account/login`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountReauthCreate
     * @request POST:/api/Account/reauth
     * @secure
     * @response `200` `AuthResponseModelResultData` OK
     */
    accountReauthCreate: (data: ReAuthRequestModel, params: RequestParams = {}) =>
      this.request<AuthResponseModelResultData, any>({
        path: `/api/Account/reauth`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountRegisterCreate
     * @request POST:/api/Account/register
     * @secure
     * @response `200` `AuthResponseModelResultData` OK
     */
    accountRegisterCreate: (data: CreateUserModel, params: RequestParams = {}) =>
      this.request<AuthResponseModelResultData, any>({
        path: `/api/Account/register`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountLogoutList
     * @request GET:/api/Account/logout
     * @secure
     * @response `200` `StringResultData` OK
     */
    accountLogoutList: (params: RequestParams = {}) =>
      this.request<StringResultData, any>({
        path: `/api/Account/logout`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
