import { CategoryPayload } from 'types/category';
import { convertCamelCaseToSnakeCase } from '../utils/convertObject';
import api from '.';

const categoryAPI = {
  fetchCategoriesList: (offset: number, limit: number) => api.request({
    url: '/categories',
    params: {
      offset,
      limit,
    },
  }),

  createCategory: (item: CategoryPayload) => api.request({
    url: '/categories',
    method: 'POST',
    data: JSON.stringify(convertCamelCaseToSnakeCase(item)),
  }),

  updateCategory: (id: number, item: CategoryPayload) => api.request({
    url: `/categories/${id}`,
    method: 'PUT',
    data: JSON.stringify(convertCamelCaseToSnakeCase(item)),
  }),

  deleteCategory: (id: number) => api.request({
    url: `/categories/${id}`,
    method: 'DELETE',
  }),
};

export default categoryAPI;
