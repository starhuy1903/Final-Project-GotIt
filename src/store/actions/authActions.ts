import { Dispatch } from "redux";
import authAPI from "../../api/authAPI";
import { NotiMsgType, setNotiMsg } from "./notiMsgActions";

export enum ActionType {
  AUTH_USER = "auth_user",
  AUTH_RESET = "auth_reset",
}

interface AuthSuccessAction {
  type: ActionType.AUTH_USER;
  payload: string;
}

interface AuthResetAction {
  type: ActionType.AUTH_RESET;
  payload: string;
}

export type AuthAction = AuthSuccessAction | AuthResetAction;

export const signIn =
  ({ email, password }: { email: string; password: string }) =>
  async (dispatch: Dispatch) => {
    try {
      const { access_token: token } = await authAPI.signIn(email, password);
      localStorage.setItem("token", token);
      dispatch({ type: ActionType.AUTH_USER, payload: token });
      return token;
    } catch (err: any) {
      dispatch({
        type: NotiMsgType.SET_MSG,
        payload: {
          error: { message: err.response.data.message },
          status: err.response.status,
        },
      });
    }
  };

export const signUp =
  ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) =>
  async (dispatch: Dispatch) => {
    try {
      await authAPI.signUp(email, password, name);
      const { access_token: token } = await authAPI.signIn(email, password);
      localStorage.setItem("token", token);
      dispatch({ type: ActionType.AUTH_USER, payload: token });
      return token;
    } catch (err: any) {
      dispatch({
        type: NotiMsgType.SET_MSG,
        payload: {
          error: { message: err.response.data.message },
          status: err.response.status,
        },
      });
    }
  };

export const signOut = () => (dispatch: Dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: ActionType.AUTH_RESET });
};
