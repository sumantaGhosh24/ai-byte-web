import type { Pagination } from "./user";

export interface UseAdminCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CreateCategoryPayload {
  name: string;
  imageUrl: string;
  imagePublicId: string;
  visibility?: "public" | "private";
}

export interface UpdateCategoryPayload {
  id: string;
  name: string;
  visibility?: "public" | "private";
  imageUrl?: string;
  imagePublicId?: string;
}

export interface DeleteCategoryPayload {
  id: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  imageUrl: string;
  imagePublicId: string;
  visibility: "public" | "private";
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  success: boolean;
  result: {
    data: CategoryItem[];

    paginations: Pagination;
  };
}

export interface CategoryResponse {
  success: boolean;
  category: CategoryItem;
}

export interface AllCategoriesResponse {
  success: boolean;
  categories: CategoryItem[];
}
