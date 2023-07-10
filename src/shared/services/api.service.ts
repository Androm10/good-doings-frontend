import axios, { Axios, AxiosHeaders, AxiosRequestConfig } from "axios";
import { BASE_URL } from "../constants/api";
import { ACCESS_JWT_TOKEN } from "../constants/tokens";
import { ApiError } from "@/core/types/api-error";
import { JwtService } from "./jwt.service";
import { LoginBackendData } from "@/core/types/backend/login-backend-data";

export class ApiService {
  private static instance: ApiService;
  axiosInstance!: Axios;

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
    });
    this.axiosInstance.interceptors.request.use(async (config) => {
      if (this.accessToken) {
        config.headers.set("Authorization", `Bearer ${this.accessToken}`);
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error?.response?.status !== 401 ||
          !JwtService.getAccessToken() ||
          error.config.retry < 0
        )
          return Promise.reject(error);

        const tokens = await this.post<LoginBackendData>(
          "auth/grantNewTokens",
          {
            refreshToken: JwtService.getRefreshToken(),
          }
        );

        JwtService.setAccessToken(tokens.accessToken);
        JwtService.setAccessToken(tokens.refreshToken);
        error.config.retry -= 1;
        return this.axiosInstance.request(error.config);
      }
    );
  }

  async get<T>(path: string, headers?: AxiosHeaders): Promise<T> {
    const config = headers ? this.applyHeadersConfig(headers) : this.baseConfig;
    try {
      const response = await this.axiosInstance.get<T>(path, config);
      return response.data;
    } catch (error) {
      this.handleRequestError(error);
      throw new Error("Unhandled error");
    }
  }

  async post<T>(path: string, body?: any, headers?: AxiosHeaders): Promise<T> {
    const config = headers ? this.applyHeadersConfig(headers) : this.baseConfig;
    try {
      const response = await this.axiosInstance.post<T>(path, body, config);
      return response.data;
    } catch (error) {
      this.handleRequestError(error);
      throw new Error("Unhandled error");
    }
  }

  async put<T>(path: string, body: any, headers?: AxiosHeaders): Promise<T> {
    const config = headers ? this.applyHeadersConfig(headers) : this.baseConfig;
    try {
      const response = await this.axiosInstance.put<T>(path, body, config);
      return response.data;
    } catch (error) {
      this.handleRequestError(error);
      throw new Error("Unhandled error");
    }
  }

  async delete<T>(path: string, headers?: AxiosHeaders): Promise<T> {
    const config = headers ? this.applyHeadersConfig(headers) : this.baseConfig;
    try {
      const response = await this.axiosInstance.delete<T>(path, config);
      return response.data;
    } catch (error) {
      this.handleRequestError(error);
      throw new Error("Unhandled error");
    }
  }

  private applyHeadersConfig(headers: AxiosHeaders) {
    const config = this.baseConfig;
    config.headers = { ...this.baseConfig.headers, ...headers };
    return config;
  }

  private get baseConfig(): AxiosRequestConfig {
    if (this.accessToken) {
      return {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      } as AxiosRequestConfig;
    }
    return {};
  }

  private handleRequestError(error: any) {
    if (error.response) {
      console.log(error.response);
      const message = error.response.data.message;
      throw new ApiError(
        message || error.response.statusText,
        true,
        error.response.status
      );
    } else if (error.request) {
      throw new ApiError("Cannot make request", false);
    } else {
      throw new Error(error.message, { cause: error });
    }
  }

  private get accessToken() {
    return JwtService.getAccessToken();
  }
}
