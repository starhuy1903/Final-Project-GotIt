import { NotiMsgState } from "store/reducers/notiMsgReducer";
import { Dispatch } from "redux";

export enum NotiMsgType {
  SET_MSG = "set_msg",
  CLEAR_MSG = "clear_msg",
}

interface SetMsgAction {
  type: NotiMsgType.SET_MSG;
  payload: NotiMsgState;
}

interface ClearMsgAction {
  type: NotiMsgType.CLEAR_MSG;
  payload: NotiMsgState;
}

export type NotiMsgAction = SetMsgAction | ClearMsgAction;

export const setNotiMsg = (msg: string) => (dispatch: Dispatch) => {
  console.log("error 2");

  dispatch({
    type: NotiMsgType.SET_MSG,
    payload: msg,
  });
};

export const clearNotiMsg = () => ({
  type: NotiMsgType.CLEAR_MSG,
  payload: "",
});
