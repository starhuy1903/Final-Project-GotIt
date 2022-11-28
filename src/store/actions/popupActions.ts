import { PopupState } from "store/reducers/popupReducer";

export enum PopupActionType {
  SET_POPUP = "set popup",
  CLOSE_POPUP = "close popup",
  OPEN_POPUP = "open popup",
  POPUP_LOADING = "popup loading",
  RESET_POPUP = "reset popup",
}

export const openPopup = () => ({
  type: PopupActionType.OPEN_POPUP,
});

export const closePopup = () => ({
  type: PopupActionType.CLOSE_POPUP,
});

export const setPopupLoading = () => ({
  type: PopupActionType.POPUP_LOADING,
});

export const setPopup = (payload: PopupState) => ({
  type: PopupActionType.SET_POPUP,
  payload,
});

export const resetPopup = () => ({
  type: PopupActionType.RESET_POPUP,
});
