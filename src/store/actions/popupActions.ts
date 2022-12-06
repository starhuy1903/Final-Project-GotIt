import { PopupState } from "store/reducers/popupReducer";

export enum PopupActionType {
  CLOSE_POPUP = "close popup",
  OPEN_POPUP = "open popup",
}

export const openPopup = (popup: PopupState) => ({
  type: PopupActionType.OPEN_POPUP,
  payload: popup,
});

export const closePopup = () => ({
  type: PopupActionType.CLOSE_POPUP,
});
