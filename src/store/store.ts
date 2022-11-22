import {
  createStore,
  applyMiddleware,
  combineReducers,
  AnyAction,
} from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import authReducer from "./reducers/authReducer";
// import notiMsgReducer from "./reducers/notiMsgReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  // notiMsg: notiMsgReducer,
});

export const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;
