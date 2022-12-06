import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { RootState } from '../store';

const middlewares = [promise, thunk];

export default configureMockStore<
  RootState,
  AnyAction,
  ThunkDispatch<RootState, void, AnyAction>
>(middlewares);
