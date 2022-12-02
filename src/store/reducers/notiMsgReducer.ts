import { NotiMsgAction, NotiMsgType } from "store/actions/notiMsgActions";
import { RootState } from "store/store";

export interface NotiMsgState {
  status: number | null;
  msg?: string;
  error?: {
    message?: string;
    data?: any;
  } | null;
}

const initialState: NotiMsgState = {
  msg: "",
  error: null,
  status: null,
};

const reducer = (state = initialState, action: NotiMsgAction) => {
  switch (action.type) {
    case NotiMsgType.SET_MSG:
      return { ...state, ...action.payload };
    case NotiMsgType.CLEAR_MSG:
      return { msg: "", error: null, status: null };
    default:
      return state;
  }
};

export const selectNotiMsg = (state: RootState) => state.notiMsg;

export default reducer;
