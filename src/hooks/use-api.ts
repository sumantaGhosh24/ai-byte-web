import { useAuth } from "@clerk/react";
import axios, { AxiosError } from "axios";
import { useMemo } from "react";

interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

export const useApi = () => {
  const { getToken } = useAuth();

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    instance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Error fetching Clerk token", error);
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiErrorResponse>) => {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Something went wrong";

        return Promise.reject(new Error(message));
      },
    );

    return instance;
  }, [getToken]);

  return api;
};
