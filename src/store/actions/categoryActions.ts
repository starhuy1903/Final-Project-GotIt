
import  categoryAPI from 'api/categoryAPI';
import { Dispatch } from "redux";
import { CategoryPayload } from 'types/category';
import { convertSnakeCaseToCamelCase } from 'utils/convertObject';
import { NotiMsgType } from './notiMsgActions';

export const fetchCategoriesList = (offset: number, limit: number) => async (dispatch: Dispatch) => {
     try {
      const res = await categoryAPI.fetchCategoriesList(offset, limit);
      const data = convertSnakeCaseToCamelCase(res?.data);
      return data;
    } catch (err: any) {
      dispatch({
        type: NotiMsgType.SET_MSG,
        payload: {
          error: { message: "Fetch category failed" },
          status: err.response.status,
        },
      });
    }
}

export const createCategory = (item: CategoryPayload) => async (dispatch: Dispatch) => {
    try {
        const res = await categoryAPI.createCategory(item);

        dispatch({
        type: NotiMsgType.SET_MSG,
        payload: {
          msg: "Create Successfully",
          status: 201,
        },
      });
      return res;
    } catch (err: any) {
        dispatch({
        type: NotiMsgType.SET_MSG,
        payload: {
          error: { message: "Create failed" },
          status: err.response.status,
        },
      });
    }
}

export const updateCategory = (id: number, item: CategoryPayload) => async (dispatch: Dispatch) => {
    try {
        const res = await categoryAPI.updateCategory(id, item);

        dispatch({
        type: NotiMsgType.SET_MSG,
        payload: {
          msg: "Update Successfully",
          status: res.status,
        },
      });
      return res;
    } catch (err: any) {
        dispatch({
        type: NotiMsgType.SET_MSG,
        payload: {
          error: { message: "Update failed" },
          status: err.response.status,
        },
      });
    }
}

export const deleteCategory = (id: number) => async (dispatch: Dispatch) => {
    try {
        const res = await categoryAPI.deleteCategory(id);

        dispatch({
        type: NotiMsgType.SET_MSG,
        payload: {
          msg: "Delete Successfully",
          status: res.status,
        },
      });
      return res;
    } catch (err: any) {
        dispatch({
        type: NotiMsgType.SET_MSG,
        payload: {
          error: { message: "Delete failed" },
          status: err.response.status,
        },
      });
    }
}
