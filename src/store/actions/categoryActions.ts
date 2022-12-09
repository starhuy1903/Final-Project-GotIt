import { CategoryPayload } from 'types/category';
import { TypedDispatch } from 'store/store';
import { apiWrapper } from 'api';
import { convertSnakeCaseToCamelCase } from '../../utils/convertObject';
import categoryAPI from '../../api/categoryAPI';
import { NotiMsgType } from './notiMsgActions';

const showSuccessMes = (data: any, dispatch: TypedDispatch) => {
  const { statusText, status } = data;
  dispatch({
    type: NotiMsgType.SET_MSG,
    payload: {
      msg: statusText,
      status,
    },
  });
};

export const fetchCategoriesList =
  (offset: number, limit: number) => async (dispatch: TypedDispatch) => {
    const result = await dispatch(apiWrapper(categoryAPI.fetchCategoriesList(offset, limit)));
    if (result.success) {
      return convertSnakeCaseToCamelCase(result.data.data);
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
