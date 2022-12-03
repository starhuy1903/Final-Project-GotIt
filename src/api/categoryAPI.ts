import { CategoryPayload } from 'types/category';
import { convertCamelCaseToSnakeCase } from 'utils/convertObject';
import api from '.';

const categoryAPI = {
  fetchCategoriesList: async (offset: number, limit: number) => await api.request({
    url: '/categories',
    params: {
      offset,
      limit,
    },
  }),

  createCategory: async (item: CategoryPayload) => await api.request({
    url: '/categories',
    method: 'POST',
    data: JSON.stringify(convertCamelCaseToSnakeCase(item)),
  }),

  updateCategory: async (id: number, item: CategoryPayload) => await api.request({
    url: `/categories/${id}`,
    method: 'PUT',
    data: JSON.stringify(convertCamelCaseToSnakeCase(item)),
  }),

  deleteCategory: async (id: number) => await api.request({
    url: `/categories/${id}`,
    method: 'DELETE',
  }),
};

export default categoryAPI;
