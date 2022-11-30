import { CategoryPayload } from "types/category";
import { snakeCaseObjKeys } from "utils/convertObject";
import api from ".";

export type Category = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

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
      data: JSON.stringify(snakeCaseObjKeys(item)),
    });
  },

  updateCategory: async (id: number, item: CategoryPayload) => {
    return await api.request({
      url: `/categories/${id}`,
      method: "PUT",
      data: JSON.stringify(snakeCaseObjKeys(item)),
    });
  },
};

export default categoryAPI;
