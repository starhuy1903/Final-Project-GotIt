import { Category, CategoryPayload } from "types/category";
import { convertCamelCaseToSnakeCase } from "utils/convertObject";
import api from ".";

export type Categories = {
  totalCategories: number;
  categoriesList: Category[];
};

const categoryAPI = {
  fetchCategoriesList: async (offset: number, limit: number) => {
    return await api.request({
      url: "/categories",
      params: {
        offset,
        limit,
      },
    });
  },

  createCategory: async (item: CategoryPayload) => {
    return await api.request({
      url: "/categories",
      method: "POST",
      data: JSON.stringify(convertCamelCaseToSnakeCase(item)),
    });
  },

  updateCategory: async (id: number, item: CategoryPayload) => {
    return await api.request({
      url: `/categories/${id}`,
      method: "PUT",
      data: JSON.stringify(convertCamelCaseToSnakeCase(item)),
    });
  },

  deleteCategory: async (id: number) => {
    return await api.request({
      url: `/categories/${id}`,
      method: "DELETE",
    });
  },
};

export default categoryAPI;
