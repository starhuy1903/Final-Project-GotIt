
import  categoryAPI from 'api/categoryAPI';
import { Dispatch } from "redux";
import { CategoryPayload } from 'types/category';
import { NotiMsgType } from './notiMsgActions';


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
          status: 201,
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
