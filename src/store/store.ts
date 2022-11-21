import {
  createStore,
  applyMiddleware,
  combineReducers,
  AnyAction,
} from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import authReducer from "./reducers/authReducer";

const reducers = combineReducers({
  auth: authReducer,
});

export const store = createStore(reducers, {}, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof reducers>;
export type RootState = ReturnType<typeof reducers>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;
