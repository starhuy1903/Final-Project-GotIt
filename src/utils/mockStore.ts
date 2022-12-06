import { configureMockStore } from '@jedmao/redux-mock-store'
import { AnyAction } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'
import {RootState} from "../store"
import promise from "redux-promise-middleware"

const middlewares = [promise, thunk]

export default configureMockStore<
  RootState,
  AnyAction,
  ThunkDispatch<RootState, void, AnyAction>
>(middlewares);
