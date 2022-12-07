import { ItemPayload } from 'types/item';
import { convertCamelCaseToSnakeCase } from '../utils/convertObject';
import api from '.';

const itemAPI = {
  fetchItemsList: (offset: number, limit: number, categoryId: number) => (
    api.request({
      url: `/categories/${categoryId}/items`,
      method: 'GET',
      params: {
        offset,
        limit,
      },
    })
  ),

  createItem: (categoryId: number, item: ItemPayload) => (
    api.request({
      url: `/categories/${categoryId}/items`,
      method: 'POST',
      data: JSON.stringify(convertCamelCaseToSnakeCase(item)),
    })
  ),

  updateItem: (itemId: number, categoryId: number, item: ItemPayload) => (
    api.request({
      url: `/categories/${categoryId}/items/${itemId}`,
      method: 'PUT',
      data: JSON.stringify(convertCamelCaseToSnakeCase(item)),
    })
  ),

  deleteItem: (itemId: number, categoryId: number) => (
    api.request({
      url: `/categories/${categoryId}/items/${itemId}`,
      method: 'DELETE',
    })
  ),

  fetchItemDetail: (itemId: number, categoryId: number) => (
    api.request({
      url: `/categories/${categoryId}/items/${itemId}`,
      method: 'GET',
    })
  ),
};

export default itemAPI;
