import { PopupActionType } from '../../actions/popupActions';
import popupReducer, { initialState, PopupType } from '../popupReducer';

describe('popupReducer', () => {
  it('should update open popup correctly', () => {
    const popupState = popupReducer(initialState, {
      type: PopupActionType.OPEN_POPUP,
      payload: {
        popupKey: PopupType.CATEGORY_FORM,
        popupProps: {
          title: 'Title',
          closeHandler: () => console.log('close'),
          onSubmit: () => console.log('submit'),
        },
      },
    });

    expect(popupState.popupKey).toBe(PopupType.CATEGORY_FORM);
    expect(popupState.popupProps.title).toBe('Title');
  });

  it('should update close popup correctly', () => {
    const popupState = popupReducer({
      popupKey: PopupType.CATEGORY_FORM,
      popupProps: {
        title: 'Add Category',
        closeHandler: () => null,
        onSubmit: () => null,
      },
    }, {
      type: PopupActionType.CLOSE_POPUP,
    });

    expect(popupState.popupKey).toBe(null);
    expect(popupState.popupProps.title).toBe('');
  });
});
