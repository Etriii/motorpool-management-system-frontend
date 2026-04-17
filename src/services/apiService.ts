import type { ApiResponse } from "@core/types";
import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

interface TokenResponse {
  access: string;
  refresh: string;
}

/*
This version replaces deprecated CancelToken with AbortController.
It also adds per-request cancellation control + safe deduping.
*/

class ApiService {
  private api: AxiosInstance;

  // Stores active requests by key -> controller
  private abortControllers: Map<string, AbortController> = new Map();

  private DEFAULT_TIMEOUT = 20000; // 20 seconds

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/",
      timeout: this.DEFAULT_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  /**
   * Builds a stable request key to avoid:
   * - duplicate requests
   * - accidental cancellations across unrelated calls
   */
  private createRequestKey(config: InternalAxiosRequestConfig): string {
    const method = config.method || "get";
    const url = config.url || "";

    const data = config.params || config.data || {};

    return `${method}:${url}:${JSON.stringify(data)}`;
  }

  private setupInterceptors() {
    /**
     * REQUEST INTERCEPTOR
     */
    this.api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem("accessToken");

      // Attach auth token
      if (token) {
        config.headers = config.headers ?? {};
        (config.headers as Record<string, string>)["Authorization"] =
          `Bearer ${token}`;
      }

      /**
       * Cancellation strategy:
       * 1. explicit cancelKey (UI-controlled)
       * 2. fallback to request fingerprint
       */
      const key = (config as any).cancelKey || this.createRequestKey(config);

      // Cancel previous request with same key (latest request wins)
      this.cancel(key);

      const controller = new AbortController();
      config.signal = controller.signal;

      this.abortControllers.set(key, controller);

      (config as any).cancelKey = key;

      return config;
    });

    /**
     * RESPONSE INTERCEPTOR
     */
    this.api.interceptors.response.use(
      (response) => {
        const key = (response.config as any).cancelKey;

        if (key) {
          const current = this.abortControllers.get(key);

          // Only cleanup if it's still the same request
          if (current?.signal === response.config.signal) {
            this.abortControllers.delete(key);
          }
        }

        return response;
      },

      async (error: AxiosError) => {
        const originalRequest: any = error.config;

        /**
         * Handle cancellation cleanup
         */
        if (axios.isCancel(error) && originalRequest?.cancelKey) {
          const key = originalRequest.cancelKey;

          const current = this.abortControllers.get(key);

          // If replaced by newer request → auto cancel
          if (current && current.signal !== originalRequest.signal) {
            (error as any).isAutoCancel = true;
          } else {
            this.abortControllers.delete(key);
          }
        }

        /**
         * Refresh token flow
         */
        if (
          error.response?.status === 401 &&
          originalRequest &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          return this.handleRefresh(originalRequest);
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Refresh token handler
   */
  private async handleRefresh(originalRequest: InternalAxiosRequestConfig) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return Promise.reject("No refresh token");
    }

    try {
      const res = await axios.post<ApiResponse<TokenResponse>>(
        `${import.meta.env.VITE_API_BASE_URL}api/v1/token/refresh/`,
        { refresh: refreshToken },
        {
          headers: { "Content-Type": "application/json" },
          timeout: this.DEFAULT_TIMEOUT,
        }
      );

      const newAccess = res.data.data.access;

      localStorage.setItem("accessToken", newAccess);
      localStorage.setItem("refreshToken", res.data.data.refresh);

      if (originalRequest.headers) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
      }

      // IMPORTANT: go through interceptor pipeline again
      return this.api.request(originalRequest);
    } catch (err) {
      // const { useAuth } = await import(
      //   "@pages/auth/presentation/composables/useAuth"
      // // );

      // useAuth().logout();
      return Promise.reject(err);
    }
  }

  /**
   * Public manual cancel (UI usage)
   */
  cancel(key: string) {
    const controller = this.abortControllers.get(key);

    if (controller) {
      controller.abort();
      this.abortControllers.delete(key);
    }
  }

  /**
   * GET
   */
  async get<T>(
    endpoint: string,
    params: Record<string, any> = {},
    cancelKey?: string
  ): Promise<T> {
    const key = cancelKey || `get:${endpoint}`;

    const res = await this.api.get<T>(endpoint, {
      params,
      cancelKey: key,
    } as any);

    return res.data;
  }

  /**
   * POST
   */
  async post<T>(
    endpoint: string,
    body: Record<string, any> = {},
    cancelKey?: string,
    timeout?: number
  ): Promise<T> {
    const key = cancelKey || `post:${endpoint}`;

    const isFormData = body instanceof FormData;

    const res = await this.api.post<T>(endpoint, body, {
      cancelKey: key,
      timeout: timeout || this.DEFAULT_TIMEOUT,
      headers: {
        ...(isFormData ? { "Content-Type": undefined } : {}),
      },
    } as any);

    return res.data;
  }

  /**
   * PUT
   */
  async put<T>(
    endpoint: string,
    body: Record<string, any> = {},
    cancelKey?: string,
    timeout?: number
  ): Promise<T> {
    const key = cancelKey || `put:${endpoint}`;

    const res = await this.api.put<T>(endpoint, body, {
      cancelKey: key,
      timeout: timeout || this.DEFAULT_TIMEOUT,
    } as any);

    return res.data;
  }

  /**
   * PATCH
   */
  async patch<T>(
    endpoint: string,
    body: Record<string, any> = {},
    cancelKey?: string,
    timeout?: number
  ): Promise<T> {
    const key = cancelKey || `patch:${endpoint}`;

    const res = await this.api.patch<T>(endpoint, body, {
      cancelKey: key,
      timeout: timeout || this.DEFAULT_TIMEOUT,
    } as any);

    return res.data;
  }

  /**
   * DELETE
   */
  async delete<T>(
    endpoint: string,
    cancelKey?: string,
    timeout?: number
  ): Promise<T> {
    const key = cancelKey || `delete:${endpoint}`;

    const res = await this.api.delete<T>(endpoint, {
      cancelKey: key,
      timeout: timeout || this.DEFAULT_TIMEOUT,
    } as any);

    return res.data;
  }
}

/**
 * Extend Axios config for cancelKey + retry tracking
 */
declare module "axios" {
  export interface InternalAxiosRequestConfig {
    cancelKey?: string;
    _retry?: boolean;
  }
}

export default new ApiService();

/*
USE IT SOMETHING LIKE THIS 

        try {
            const data = await getStudentPaymentsApi(student_id, "getStudentPayments"); // the "getStudentPayments" key wil be used for calling cancel("getStudentPayments") method from apiServicev2 to stop the request :>

            cache.data = data;
            cache.fetched = true;
            cache.loading = false;
        } catch (error: any) {
            // CHECK: If this was cancelled because a newer request started,
            if (error.isAutoCancel) {
                // console.error("Request superseded by a newer one.");
                return;
            }

            cache.loading = false;
            throw error;
        } // dont use finally block to stop loading as it will stop the loading when refetched :>
*/

