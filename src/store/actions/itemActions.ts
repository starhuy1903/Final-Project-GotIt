import itemAPI from "api/itemAPI";
import { Dispatch } from "redux";
import { ItemPayload } from "types/item";
import { convertSnakeCaseToCamelCase } from "utils/convertObject";
import { NotiMsgType } from "./notiMsgActions";

export const fetchItemsList = (offset: number, limit: number, categoryId: number) => async (dispatch: Dispatch) => {
     try {
      const res = await itemAPI.fetchItemsList(offset, limit, categoryId);
      const data = convertSnakeCaseToCamelCase(res?.data);
      return data;
    } catch (err: any) {
      dispatch({
        type: NotiMsgType.SET_MSG,
        payload: {
          error: { message: "Fetch item failed" },
          status: err.response.status,
        },
      });
    }
}

export const createItem = (categoryId: number, item: ItemPayload) => async (dispatch: Dispatch) => {
    try {
        const res = await itemAPI.createItem(categoryId, item);

        dispatch({
        type: NotiMsgType.SET_MSG,
        payload: {
          msg: "Create Item Successfully",
          status: 201,
        },
      });
      return res;
    } catch (err: any) {
        dispatch({
        type: NotiMsgType.SET_MSG,
        payload: {
          error: { message: "Create Item failed" },
          status: err.response.status,
        },
      });
    }
}


export const updateItem = (itemId: number, categoryId: number, item: ItemPayload) => async (dispatch: Dispatch) => {
    try {
        const res = await itemAPI.updateItem(itemId, categoryId, item);

        dispatch({
        type: NotiMsgType.SET_MSG,
        payload: {
          msg: "Update Item Successfully",
          status: 200,
        },
      });
      return res;
    } catch (err: any) {
        dispatch({
        type: NotiMsgType.SET_MSG,
        payload: {
          error: { message: "Update Item failed" },
          status: err.response.status,
        },
      });
    }
}

export const deleteItem = (itemId: number, categoryId: number) => async (dispatch: Dispatch) => {
    try {
        const res = await itemAPI.deleteItem(itemId, categoryId);

        dispatch({
        type: NotiMsgType.SET_MSG,
        payload: {
          msg: "Delete Item Successfully",
          status: res.status,
        },
      });
      return res;
    } catch (err: any) {
        dispatch({
        type: NotiMsgType.SET_MSG,
        payload: {
          error: { message: "Delete Item failed" },
          status: err.response.status,
        },
      });
    }
}

export const fetchItemDetail = (itemId: number, categoryId: number) => async (dispatch: Dispatch) => {
     try {
      const res = await itemAPI.fetchItemDetail(itemId, categoryId);
      const data = convertSnakeCaseToCamelCase(res?.data);
      return data;
    } catch (err: any) {
      dispatch({
        type: NotiMsgType.SET_MSG,
        payload: {
          error: { message: "Fetch item detail failed" },
          status: err.response.status,
        },
      });
    }
}