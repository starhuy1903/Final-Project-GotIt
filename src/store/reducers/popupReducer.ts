import { RootState } from "../store";
import { PopupActionType } from "../actions/popupActions";

type PopupPropsType = {
  title: string;
  item?: any;
  closeHandler: () => void;
  onSubmit: (...params: any[]) => void,
};

export enum PopupType {
  CATEGORY_FORM = "Category Form",
  ITEM_FORM = "Item Form",
  LOGIN_CONFIRM = "Login Confirm",
  DELETE_CONFIRM = "Delete Confirm",
  NOTIFICATION_MESSAGE = "Notification Message",
}
export interface PopupState {
  popupKey: string;
  popupProps: PopupPropsType;
}

type Action = {
  type: string;
  payload?: PopupState;
};

const initialState: PopupState = {
  popupKey: "",
  popupProps: {
    title: "",
    closeHandler: () => null,
    onSubmit: () => null,
  },
};

const popupReducer = (state = initialState, action: Action): PopupState => {
  switch (action.type) {
    case PopupActionType.OPEN_POPUP:
      return {
        ...state,
        ...action.payload,
      };

    case PopupActionType.CLOSE_POPUP:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export const popupSelector = (state: RootState) => state.popup;
export default popupReducer;
