import { CategoryPayload } from 'types/category';
import { TypedDispatch } from 'store/store';
import { apiWrapper } from '../../api';
import categoryAPI from '../../api/category';
import { showSuccessMes } from '.';

export const fetchCategoriesList =
  (offset: number, limit: number) => async (dispatch: TypedDispatch) => {
    const result = await dispatch(apiWrapper(categoryAPI.fetchCategoriesList(offset, limit)));
    if (result.success) {
      return result.data.data;
    }
    return null;
  };

export const createCategory =
  (item: CategoryPayload) => async (dispatch: TypedDispatch) => {
    const result = await dispatch(apiWrapper(categoryAPI.createCategory(item)));
    if (result.success) {
      showSuccessMes(result.data, dispatch);
    }
    return result.success;
  };

export const updateCategory =
  (id: number, item: CategoryPayload) => async (dispatch: TypedDispatch) => {
    const result = await dispatch(apiWrapper(categoryAPI.updateCategory(id, item)));
    if (result.success) {
      showSuccessMes(result.data, dispatch);
    }
    return result.success;
  };

export const deleteCategory = (id: number) => async (dispatch: TypedDispatch) => {
  const result = await dispatch(apiWrapper(categoryAPI.deleteCategory(id)));
  if (result.success) {
    showSuccessMes(result.data, dispatch);
  }
  return result.success;
};
