import { Dispatch } from "redux";
import authAPI from "../../api/authAPI";

export enum ActionType {
  AUTH_USER = "auth_user",
  AUTH_ERROR = "auth_error",
}

interface AuthSuccessAction {
  type: ActionType.AUTH_USER;
  payload: string;
}

interface AuthErrorAction {
  type: ActionType.AUTH_ERROR;
  payload: string;
}

export type AuthAction = AuthSuccessAction | AuthErrorAction;

export const signIn =
  ({ email, password }: { email: string; password: string }) =>
  async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { access_token: token } = await authAPI.signIn(email, password);
      localStorage.setItem("token", token);
      dispatch({ type: ActionType.AUTH_USER, payload: token });
      return token;
    } catch (err: any) {
      dispatch({ type: ActionType.AUTH_ERROR, payload: err.message });
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
  async (dispatch: Dispatch<AuthAction>) => {
    try {
      await authAPI.signUp(email, password, name);
      const { access_token: token } = await authAPI.signIn(email, password);
      localStorage.setItem("token", token);
      dispatch({ type: ActionType.AUTH_USER, payload: token });
      return token;
    } catch (err: any) {
      dispatch({ type: ActionType.AUTH_ERROR, payload: err.message });
    }
  };

export const signOut = () => (dispatch: Dispatch<AuthAction>) => {
  localStorage.removeItem("token");
  dispatch({ type: ActionType.AUTH_USER, payload: "" });
};
