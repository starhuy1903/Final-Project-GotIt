import { RootState } from "store/store";
import { AuthActionType, AuthAction } from "../actions/authActions";

interface AuthState {
  token: string | null;
  name: string | null;
  id: number | null;
}

export const initialState: AuthState = {
  token: null,
  name: null,
  id: null,
};

const reducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionType.AUTH_TOKEN:
      return { ...state, token: action.payload };
    case AuthActionType.AUTH_USER: {
      const {id, name} = action.payload;
      return {...state, name, id}
    }
    case AuthActionType.AUTH_RESET:
      return initialState;
    default:
      return state;
  }
};

export const selectToken = (state: RootState) => state.auth.token;
export const selectName = (state: RootState) => state.auth.name;
export const selectUserId = (state: RootState) => state.auth.id;

export default reducer;
