// import { MouseEvent } from 'react';
import { RootState } from '../store';
import { PopupActionType } from '../actions/popupActions';
import { Item } from '../../types/item';
import { Category } from '../../types/category';

export type PopupPropsType = {
  title: string;
  item?: Item | Category;
  closeHandler: (() => void) | null;
  onSubmit: ((...params: any[]) => void) | null,
};

export enum PopupType {
  CATEGORY_FORM = 'Category Form',
  ITEM_FORM = 'Item Form',
  LOGIN_CONFIRM = 'Login Confirm',
  DELETE_CONFIRM = 'Delete Confirm',
  NOTIFICATION_MESSAGE = 'Notification Message',
}
export interface PopupState {
  popupKey: PopupType | null;
  popupProps: PopupPropsType;
}

type PopupAction = {
  type: string;
  payload?: PopupState;
};

export const initialState: PopupState = {
  popupKey: null,
  popupProps: {
    title: '',
    closeHandler: null,
    onSubmit: null,
  },
};

const popupReducer = (state = initialState, action: PopupAction): PopupState => {
  switch (action.type) {
    case PopupActionType.OPEN_POPUP:
      return {
        ...state,
        ...action.payload,
      };

    case PopupActionType.CLOSE_POPUP:
      return initialState;

    default:
      return state;
  }
};

export const popupSelector = (state: RootState) => state.popup;
export default popupReducer;
