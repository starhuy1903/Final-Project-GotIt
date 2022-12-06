import {
  createStore,
  applyMiddleware,
  combineReducers,
  AnyAction,
} from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer';
import notiMsgReducer from './reducers/notiMsgReducer';
import popupReducer from './reducers/popupReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  notiMsg: notiMsgReducer,
  popup: popupReducer,
});

export const configureStore = (preloadedState = {}) => createStore(
  rootReducer,
  preloadedState,
  composeWithDevTools(applyMiddleware((thunk as any).default || thunk)),
);

export const store = configureStore();

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
