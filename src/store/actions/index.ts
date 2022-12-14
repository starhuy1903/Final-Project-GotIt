import { Dispatch } from 'redux';
import { NotiMsgType } from './notiMsgActions';

type Message = {
  status: number;
  statusText: string;
}

export const showSuccessMes = (data: Message, dispatch: Dispatch) => {
  const { statusText, status } = data;
  dispatch({
    type: NotiMsgType.SET_MSG,
    payload: {
      msg: statusText,
      status,
    },
  });
};

export * from './authActions';
