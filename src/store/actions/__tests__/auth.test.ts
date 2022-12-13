import MockerAdapter from 'axios-mock-adapter';
import api from '../../../api';
import { TypedDispatch, configureStore } from '../../store';
import * as authAction from '../auth';

describe('authActions', () => {
  let store: null | ReturnType<typeof configureStore> = null;
  let mock: MockerAdapter;
  let dispatch: TypedDispatch;

  beforeEach(() => {
    store = configureStore();
    dispatch = <TypedDispatch>store.dispatch;
  });

  beforeAll(() => {
    mock = new MockerAdapter(api);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should sign in succeed', async () => {
    if (store) {
      const email = 'test@test.com';
      const password = '1234';
      const res = { access_token: 'token' };
      mock.onPost('/auth').reply(200, res);

      await dispatch(authAction.signIn({ email, password }));

      // url exactly
      expect(mock.history.post[0].url).toEqual('/auth');
      // store update token correctly'
      expect(store.getState().auth.token).toEqual(res.access_token);
    }
  });

  it('should sign in failed', async () => {
    if (store) {
      const email = 'test@test.com';
      const password = '1234';
      const res = { message: 'Invalid email or password.' };
      const statusCode = 400;
      mock.onPost('/auth').reply(statusCode, res);

      await dispatch(authAction.signIn({ email, password }));

      // url exactly
      expect(mock.history.post[0].url).toEqual('/auth');
      // store update token correctly'
      expect(store.getState().auth.token).toBeNull;

      expect(store.getState().notiMsg.error).toEqual(res);
      expect(store.getState().notiMsg.status).toEqual(statusCode);
    }
  });

  it('should sign up succeed', async () => {
    if (store) {
      const email = 'test@test.com';
      const password = '1234';
      const name = 'huy';
      mock.onPost('/users').reply(201, {});

      await dispatch(authAction.signUp({ email, password, name }));

      // url exactly
      expect(mock.history.post[0].url).toEqual('/users');
      // store update token correctly'
      expect(store.getState().auth.token).toBeNull;
    }
  });

  it('should sign up failed', async () => {
    if (store) {
      const email = 'test@test.com';
      const password = '1234';
      const name = 'huy';
      const res = { message: 'Bad Request' };
      const statusCode = 400;
      mock.onPost('/users').reply(statusCode, res);

      await dispatch(authAction.signUp({ email, password, name }));

      // url exactly
      expect(mock.history.post[0].url).toEqual('/users');
      // store update token correctly'
      expect(store.getState().auth.token).toBeNull;

      expect(store.getState().notiMsg.error).toEqual(res);
      expect(store.getState().notiMsg.status).toEqual(statusCode);
    }
  });

  it('should remove token when sign out', async () => {
    if (store) {
      await dispatch(authAction.signOut());

      // store update token correctly'
      expect(store.getState().auth.token).toBeNull;
    }
  });
});
