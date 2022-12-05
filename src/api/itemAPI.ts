import api from "api";
import { ItemPayload } from "types/item";
import { convertCamelCaseToSnakeCase } from "utils/convertObject";

const itemAPI = {
  fetchItemsList: async (offset: number, limit: number, categoryId: number) => {
    return await api.request({
      url: `/categories/${categoryId}/items`,
      method: "GET",
      params: {
        offset,
        limit,
      },
    });
  },

  createItem: async (categoryId: number, item: ItemPayload) => {
    return await api.request({
      url: `/categories/${categoryId}/items`,
      method: "POST",
      data: JSON.stringify(convertCamelCaseToSnakeCase(item)),
    });
  },

  updateItem: async (itemId: number, categoryId: number, item: ItemPayload) => {
    return await api.request({
      url: `/categories/${categoryId}/items/${itemId}`,
      method: "PUT",
      data: JSON.stringify(convertCamelCaseToSnakeCase(item)),
    });
  },

  deleteItem: async (itemId: number, categoryId: number) => {
    return await api.request({
      url: `/categories/${categoryId}/items/${itemId}`,
      method: "DELETE",
    });
  },

  fetchItemDetail: async(itemId: number, categoryId: number) => {
     return await api.request({
      url: `/categories/${categoryId}/items/${itemId}`,
      method: "GET",
    });
  }
};

export default itemAPI;

