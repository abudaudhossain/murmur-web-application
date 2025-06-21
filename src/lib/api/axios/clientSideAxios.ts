import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const clientSideAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 6000,

  headers: {},
  // Removed invalid 'credentials' property
});

// Add a request interceptor

clientSideAxios.interceptors.request.use(
  function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {

    return config;
  },
  function (error: AxiosError): Promise<never> {

    return Promise.reject(error);
  }
);

// Add a response interceptor
clientSideAxios.interceptors.response.use(

  function (response: AxiosResponse): AxiosResponse {

    // Do something with response data
    return response;
  },
  function (error: AxiosError): Promise<never> {
    if (error.code === "ECONNABORTED") {
      // errorMessage("The request took too long to complete. Please try again later.");
    }

    // Example handling 401
    if (error.response?.status === 401) {

      window.location.href = "/login"; // Redirect to login page

    }

    return Promise.reject(error);
  }
);
