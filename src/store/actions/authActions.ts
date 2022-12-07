import { Dispatch } from 'redux';
import { convertSnakeCaseToCamelCase } from '../../utils/convertObject';
import { TOKEN_KEY } from '../../constants';
import authAPI from '../../api/authAPI';
import { NotiMsgType } from './notiMsgActions';

export enum AuthActionType {
  AUTH_TOKEN = 'auth_token',
  AUTH_USER = 'auth_user',
  AUTH_RESET = 'auth_reset',
}

interface AuthSuccessAction {
  type: AuthActionType.AUTH_TOKEN;
  payload: string;
}

interface AuthUserInfoAction {
  type: AuthActionType.AUTH_USER;
  payload: {name: string, id: number};
}

interface AuthResetAction {
  type: AuthActionType.AUTH_RESET;
  payload: string;
}

export type AuthAction = AuthSuccessAction | AuthUserInfoAction | AuthResetAction;

export const signIn = ({ email, password }: { email: string; password: string }) => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.signIn(email, password);
    const { accessToken: token } = convertSnakeCaseToCamelCase(res.data);
    localStorage.setItem(TOKEN_KEY, token);
    dispatch({ type: AuthActionType.AUTH_TOKEN, payload: token });
    return res.status === 200;
  } catch (err: any) {
    const { data, status } = err.response;
    dispatch({
      type: NotiMsgType.SET_MSG,
      payload: {
        error: { message: data.message },
        status
      },
    });
    return null;
  }
};

export const signUp = ({
  email,
  password,
  name,
}: {
    email: string;
    password: string;
    name: string;
  }) => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.signUp(email, password, name);
    return res.status === 201;
  } catch (err: any) {
    const { data, status } = err.response;
    dispatch({
      type: NotiMsgType.SET_MSG,
      payload: {
        error: { message: data.message },
        status,
      },
    });
    return null;
  }
};

export const fetchUserInfo = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.fetchUserInfo();
    const { id, name } = res.data;
    dispatch({ type: AuthActionType.AUTH_USER, payload: { id, name } });
    return res.status === 200;
  } catch (err: any) {
    const { data, status } = err.response;
    dispatch({
      type: NotiMsgType.SET_MSG,
      payload: {
        error: { message: data.message },
        status,
      },
    });
    return null;
  }
};

export const signOut = () => (dispatch: Dispatch) => {
  localStorage.removeItem(TOKEN_KEY);
  dispatch({ type: AuthActionType.AUTH_RESET });
};
