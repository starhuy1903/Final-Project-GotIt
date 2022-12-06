import axios from 'axios';
import MockerAdapter from 'axios-mock-adapter';
import { configureStore } from '../../store';
import  * as authAction from '../authActions';

describe('authActions', () => {
  let store: null | ReturnType<typeof configureStore> = null;
  const mock = new MockerAdapter(axios);

  beforeEach(() => {
    store = configureStore();
  });

  it('sign in success', async () => {
    // if (store) {
    //   mock.onPost('/auth').reply(200, { access_token: 'token' });

    //   store.dispatch(authAction.signIn({ email: 'email', password: 'password' }));
    // }
  });
});
