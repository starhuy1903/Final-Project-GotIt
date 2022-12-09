import { Dispatch } from 'redux';
import { apiWrapper } from '../../api';
import { TypedDispatch } from '../store';
import { convertSnakeCaseToCamelCase } from '../../utils/convertObject';
import { TOKEN_KEY } from '../../constants';
import authAPI from '../../api/authAPI';

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

export const signIn = ({ email, password }: { email: string; password: string }) => async (dispatch: TypedDispatch) => {
  const result = await dispatch(apiWrapper(authAPI.signIn(email, password)));
  if (result.success) {
    const { accessToken: token } = convertSnakeCaseToCamelCase(result.data.data);
    localStorage.setItem(TOKEN_KEY, token);
    dispatch({ type: AuthActionType.AUTH_TOKEN, payload: token });
  }
  return result.success;
};

export const signUp = ({
  email,
  password,
  name,
}: {
    email: string;
    password: string;
    name: string;
  }) => async (dispatch: TypedDispatch) => {
  const result = await dispatch(apiWrapper(authAPI.signUp(email, password, name)));
  return result.success;
};

export const fetchUserInfo = () => async (dispatch: TypedDispatch) => {
  const result = await dispatch(apiWrapper(authAPI.fetchUserInfo()));
  if (result.success) {
    const { id, name } = convertSnakeCaseToCamelCase(result.data.data);
    dispatch({ type: AuthActionType.AUTH_USER, payload: { id, name } });
  }
  return result.success;
};

export const signOut = () => (dispatch: Dispatch) => {
  localStorage.removeItem(TOKEN_KEY);
  dispatch({ type: AuthActionType.AUTH_RESET });
};
