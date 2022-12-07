import { Dispatch } from 'redux';
import { ItemPayload } from 'types/item';
import { convertSnakeCaseToCamelCase } from '../../utils/convertObject';
import itemAPI from '../../api/itemAPI';
import { NotiMsgType } from './notiMsgActions';

export const fetchItemsList = (offset: number, limit: number, categoryId: number) => async (dispatch: Dispatch) => {
  try {
    const res = await itemAPI.fetchItemsList(offset, limit, categoryId);
    const data = convertSnakeCaseToCamelCase(res?.data);
    return data;
  } catch (err: any) {
    const { status, data } = err.response;
    const { message: errMessage, data: errData } = data;
    dispatch({
      type: NotiMsgType.SET_MSG,
      payload: {
        error: { message: errMessage, data: errData },
        status,
      },
    });
    return null;
  }
};

export const createItem = (categoryId: number, item: ItemPayload) => async (dispatch: Dispatch) => {
  try {
    const res = await itemAPI.createItem(categoryId, item);
    dispatch({
      type: NotiMsgType.SET_MSG,
      payload: {
        msg: res.statusText,
        status: res.status,
      },
    });
    return res.status === 201;
  } catch (err: any) {
    const { status, data } = err.response;
    const { message: errMessage, data: errData } = data;
    dispatch({
      type: NotiMsgType.SET_MSG,
      payload: {
        error: { message: errMessage, data: errData },
        status,
      },
    });
    return false;
  }
};

export const updateItem = (itemId: number, categoryId: number, item: ItemPayload) => async (dispatch: Dispatch) => {
  try {
    const res = await itemAPI.updateItem(itemId, categoryId, item);
    dispatch({
      type: NotiMsgType.SET_MSG,
      payload: {
        msg: res.statusText,
        status: res.status,
      },
    });
    return res.status === 200;
  } catch (err: any) {
    const { status, data } = err.response;
    const { message: errMessage, data: errData } = data;
    dispatch({
      type: NotiMsgType.SET_MSG,
      payload: {
        error: { message: errMessage, data: errData },
        status,
      },
    });
    return false;
  }
};

export const deleteItem = (itemId: number, categoryId: number) => async (dispatch: Dispatch) => {
  try {
    const res = await itemAPI.deleteItem(itemId, categoryId);
    dispatch({
      type: NotiMsgType.SET_MSG,
      payload: {
        msg: res.statusText,
        status: res.status,
      },
    });
    return res.status === 200;
  } catch (err: any) {
    const { status, data } = err.response;
    const { message: errMessage, data: errData } = data;
    dispatch({
      type: NotiMsgType.SET_MSG,
      payload: {
        error: { message: errMessage, data: errData },
        status,
      },
    });
    return false;
  }
};

export const fetchItemDetail = (itemId: number, categoryId: number) => async (dispatch: Dispatch) => {
  try {
    const res = await itemAPI.fetchItemDetail(itemId, categoryId);
    const data = convertSnakeCaseToCamelCase(res?.data);
    return data;
  } catch (err: any) {
    const { status, data } = err.response;
    const { message: errMessage, data: errData } = data;
    dispatch({
      type: NotiMsgType.SET_MSG,
      payload: {
        error: { message: errMessage, data: errData },
        status,
      },
    });
    return null;
  }
};
