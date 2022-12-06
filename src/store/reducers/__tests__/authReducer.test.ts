import { AuthActionType } from '../../actions/authActions';
import authReducer, { initialState } from '../authReducer';

describe('authReducer', () => {
  it('should update token correctly', () => {
    const authState = authReducer(initialState, {
      type: AuthActionType.AUTH_TOKEN,
      payload: 'token',
    });
    expect(authState.token).toBe('token');
  })

  it('should update user info correctly', () => {
    const authState = authReducer(initialState, {
      type: AuthActionType.AUTH_USER,
      payload: {name: "Huy", id: 1},
    });
    expect(authState.id).toBe(1);
    expect(authState.name).toBe('Huy');
  })

  it('should reset auth correctly', () => {
    const authState = authReducer(initialState, {
      type: AuthActionType.AUTH_RESET,
      payload: ''
    });
    expect(authState).toBe(initialState);
  })
});
