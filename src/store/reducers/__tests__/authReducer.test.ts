import { AuthActionType } from './../../actions/authActions';
import authReducer, { initialState } from '../authReducer';

describe('authReducer', () => {
  it('should update correctly', () => {
    const authState = authReducer(initialState, {
      type: AuthActionType.AUTH_TOKEN,
      payload: 'token',
    });

    expect(authState.token).toBe('token');
  })
});
