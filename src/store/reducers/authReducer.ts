import { RootState } from "store/store";
import { ActionType, AuthAction } from "../actions/authActions";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
};

const reducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case ActionType.AUTH_USER:
      return { token: action.payload };
    case ActionType.AUTH_RESET:
      return { token: null };
    default:
      return state;
  }
};

export const selectToken = (state: RootState) => state.auth.token;

export default reducer;
