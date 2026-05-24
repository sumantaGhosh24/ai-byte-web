import type { Pagination } from "./user.type";

type Visibility = "public" | "private";

export interface UseAdminCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CreateCategoryPayload {
  name: string;
  imageUrl: string;
  imagePublicId: string;
  visibility?: Visibility;
}

export interface UpdateCategoryPayload {
  id: string;
  name: string;
  visibility?: Visibility;
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
  visibility: Visibility;
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
