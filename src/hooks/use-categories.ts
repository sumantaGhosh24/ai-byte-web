import { useAuth } from "@clerk/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { queryClient } from "@/providers/query-provider";
import type {
  CategoryResponse,
  CategoriesResponse,
  CreateCategoryPayload,
  DeleteCategoryPayload,
  UpdateCategoryPayload,
  UseAdminCategoriesParams,
  AllCategoriesResponse,
} from "@/types/category.type";

import { useApi } from "./use-api";

export function useCategories() {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<AllCategoriesResponse>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response: AxiosResponse<AllCategoriesResponse> = await api.get("/categories");

      return response.data;
    },
    retry: false,
    enabled: isLoaded && isSignedIn,
  });
}

export function useAdminCategories({
  page = 1,
  limit = 10,
  search = "",
}: UseAdminCategoriesParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<CategoriesResponse>({
    queryKey: ["admin-categories", page, limit, search],
    queryFn: async () => {
      const response: AxiosResponse<CategoriesResponse> = await api.get("/admin/categories", {
        params: {
          page,
          limit,
          search,
        },
      });
      return response.data;
    },
    retry: false,
    enabled: isLoaded && isSignedIn,
  });
}

export function useCategory(categoryId: string) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<CategoryResponse>({
    queryKey: ["category", categoryId],
    queryFn: async () => {
      const response: AxiosResponse<CategoryResponse> = await api.get(`/categories/${categoryId}`);
      return response.data;
    },
    retry: false,
    enabled: !!categoryId && isLoaded && isSignedIn,
  });
}

export function useCreateCategory() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: CreateCategoryPayload) => {
      const response = await api.post("/categories", payload);
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
  });
}

export function useUpdateCategory() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ id, ...payload }: UpdateCategoryPayload) => {
      const response = await api.put(`/categories/${id}`, payload);
      return response.data;
    },
    retry: false,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      await queryClient.invalidateQueries({ queryKey: ["category", variables.id] });
    },
  });
}

export function useDeleteCategory() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ id }: DeleteCategoryPayload) => {
      const response = await api.delete(`/categories/${id}`);
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
  });
}
