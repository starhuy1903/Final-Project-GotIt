import { ActionType, AuthAction } from "../actions/authActions";

interface AuthState {
  errorMsg: string | null;
  authenticated: boolean;
  token: string | null;
}

const initialState = {
  errorMsg: null,
  authenticated: false,
  token: null,
};

const reducer = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case ActionType.AUTH_USER:
      return { authenticated: action.payload, errorMsg: null };
    case ActionType.AUTH_ERROR:
      return { authenticated: null, errorMsg: action.payload };
    default:
      return state;
  }
};

export default reducer;
