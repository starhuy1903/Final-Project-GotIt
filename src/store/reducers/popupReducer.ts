import { RootState } from "../store";
import { PopupActionType } from "../actions/popupActions";

export interface PopupState {
  isLoading: boolean;
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeHandler: () => void;
}

type Action = {
  type: string;
  payload?: PopupState;
};

const initialState: PopupState = {
  isLoading: false,
  isOpen: false,
  children: null,
  footer: null,
  title: "",
  closeHandler: () => null,
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
        isOpen: false,
      };

    case PopupActionType.OPEN_POPUP:
      return {
        ...state,
        isOpen: true,
      };

    case PopupActionType.POPUP_LOADING:
      return {
        ...state,
        isLoading: true,
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
