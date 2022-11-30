import { RootState } from "../store";
import { PopupActionType } from "../actions/popupActions";

type PopupPropsType = {
  title: string;
  children: React.ReactNode;
  isLoading: boolean;
  isOpen: boolean;
  footer?: React.ReactNode;
  closeHandler: () => void;
};

export enum PopupType {
  FORM_POPUP = "formPopup",
  CONFIRM_POPUP = "confirmPopup",
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
    children: null,
    isOpen: false,
    isLoading: false,
    closeHandler: () => null,
  },
};

const popupReducer = (state = initialState, action: Action): PopupState => {
  switch (action.type) {
    case PopupActionType.SET_POPUP:
      return {
        ...state,
        ...action.payload,
      };

    case PopupActionType.CLOSE_POPUP:
      return {
        ...state,
        popupProps: { ...state.popupProps, isOpen: false },
      };

    case PopupActionType.OPEN_POPUP:
      return {
        ...state,
        popupProps: { ...state.popupProps, isOpen: true },
      };

    case PopupActionType.POPUP_LOADING:
      return {
        ...state,
        popupProps: { ...state.popupProps, isLoading: true },
      };

    case PopupActionType.RESET_POPUP:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export const popupSelector = (state: RootState) => state.popup;
export default popupReducer;
