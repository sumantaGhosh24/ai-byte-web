import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type { ImageUploadResponse } from "@/types/upload.type";

import { useApi } from "./use-api";

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
