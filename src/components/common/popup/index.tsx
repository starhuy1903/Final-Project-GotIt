import useAppSelector from 'hooks/useAppSelector';
import React from 'react';
import { PopupPropsType, popupSelector, PopupType } from 'store/reducers/popupReducer';
import CategoryForm from './CategoryForm';
import DeleteConfirm from './DeleteConfirm';
import ItemForm from './ItemForm';
import LoginConfirm from './LoginConfirm';
import NotificationMessage from './NotificationMessage';

type PopupMapType = Record<PopupType, React.FC<PopupPropsType>>;

const PopupMap: PopupMapType = {
  [PopupType.CATEGORY_FORM]: CategoryForm,
  [PopupType.ITEM_FORM]: ItemForm,
  [PopupType.LOGIN_CONFIRM]: LoginConfirm,
  [PopupType.DELETE_CONFIRM]: DeleteConfirm,
  [PopupType.NOTIFICATION_MESSAGE]: NotificationMessage,
};

const CustomPopup = () => {
  const { popupKey, popupProps } = useAppSelector(popupSelector);
  if (!popupKey) return null;

  const Popup = PopupMap[popupKey as keyof PopupMapType];

  return <Popup {...popupProps} />;
};

export default CustomPopup;
