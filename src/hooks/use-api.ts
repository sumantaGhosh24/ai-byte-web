import { useAuth } from "@clerk/react";
import axios from "axios";
import { useMemo } from "react";

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

    return instance;
  }, [getToken]);

  return api;
};
