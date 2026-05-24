import { useMutation } from "@tanstack/react-query";

import { useApi } from "./use-api";
import type { ImageUploadResponse } from "@/types/upload";
import type { AxiosResponse } from "axios";

export function useUploadImage() {
  const api = useApi();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const response: AxiosResponse<ImageUploadResponse> = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    retry: false,
  });
}

export function useDestroyImage() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: { public_id: string }) => {
      const response = await api.post("/destroy", payload);
      return response.data;
    },
    retry: false,
  });
}
