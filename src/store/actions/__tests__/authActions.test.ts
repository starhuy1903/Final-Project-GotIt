import axios from 'axios';
import MockerAdapter from 'axios-mock-adapter';
import * as actions from '../authActions';
import mockStore from '../../../utils/mockStore';

describe('authActions', () => {
  let store: ReturnType<typeof mockStore>;
  const mock = new MockerAdapter(axios);

  beforeEach(() => {
    store = mockStore({});
  });

  it('sign in success', async () => {
    mock.onPost('/auth').reply(200, { access_token: 'token' });

    store.dispatch(actions.signIn({ email: 'email', password: 'password' })).then(() => { console.log('Hello'); });

    console.log(store.getActions());
  });
});
