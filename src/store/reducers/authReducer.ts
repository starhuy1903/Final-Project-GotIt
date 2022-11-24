import { RootState } from "store/store";
import { AuthActionType, AuthAction } from "../actions/authActions";

interface AuthState {
  token: string | null;
}

export const initialState: AuthState = {
  // Initial state should be null,
  // Please get item from local storage in another place and call update action
  token: null,
};

const reducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionType.AUTH_USER:
      return { token: action.payload };
    case AuthActionType.AUTH_RESET:
      return { token: null };
    default:
      return state;
  }
};

export const selectToken = (state: RootState) => state.auth.token;

export default reducer;
