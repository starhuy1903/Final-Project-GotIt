import { ItemPayload } from 'types/item';
import { apiWrapper } from '../../api';
import { showSuccessMes } from '.';
import { TypedDispatch } from '../store';
import itemAPI from '../../api/itemAPI';

export const fetchItemsList = (offset: number, limit: number, categoryId: number) => async (dispatch: TypedDispatch) => {
  const result = await dispatch(apiWrapper(itemAPI.fetchItemsList(offset, limit, categoryId)));
  if (result.success) {
    return result.data.data;
  }
  return null;
};

export const createItem = (categoryId: number, item: ItemPayload) => async (dispatch: TypedDispatch) => {
  const result = await dispatch(apiWrapper(itemAPI.createItem(categoryId, item)));
  if (result.success) {
    showSuccessMes(result.data, dispatch);
  }
  return result.success;
};

export const updateItem = (itemId: number, categoryId: number, item: ItemPayload) => async (dispatch: TypedDispatch) => {
  const result = await dispatch(apiWrapper(itemAPI.updateItem(itemId, categoryId, item)));
  if (result.success) {
    showSuccessMes(result.data, dispatch);
  }
  return result.success;
};

export const deleteItem = (itemId: number, categoryId: number) => async (dispatch: TypedDispatch) => {
  const result = await dispatch(apiWrapper(itemAPI.deleteItem(itemId, categoryId)));
  if (result.success) {
    showSuccessMes(result.data, dispatch);
  }
  return result.success;
};

export const fetchItemDetail = (itemId: number, categoryId: number) => async (dispatch: TypedDispatch) => {
  const result = await dispatch(apiWrapper(itemAPI.fetchItemDetail(itemId, categoryId)));
  if (result.success) {
    return result.data.data;
  }
  return null;
};
