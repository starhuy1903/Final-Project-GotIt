import { useAppSelector } from "hooks";
import { popupSelector, PopupType } from "store/reducers/popupReducer";
import CategoryForm, { CategoryFormProps } from "./CategoryForm";
import DeleteConfirm, { DeleteConfirmProps } from "./DeleteConfirm";
import ItemForm, { ItemFormProps } from "./ItemForm";
import LoginConfirm, { LoginConfirmProps } from "./LoginConfirm";
import NotificationMessage, { NotificationMessageProps } from "./NotificationMessage";

type PopupMapType = {
  [PopupType.CATEGORY_FORM]: React.FC<CategoryFormProps>;
  [PopupType.ITEM_FORM]: React.FC<ItemFormProps>;
  [PopupType.LOGIN_CONFIRM]: React.FC<LoginConfirmProps>;
  [PopupType.DELETE_CONFIRM]: React.FC<DeleteConfirmProps>;
  [PopupType.NOTIFICATION_MESSAGE]: React.FC<NotificationMessageProps>;
};

const PopupMap: PopupMapType = {
  [PopupType.CATEGORY_FORM]: CategoryForm,
  [PopupType.ITEM_FORM]: ItemForm,
  [PopupType.LOGIN_CONFIRM]: LoginConfirm,
  [PopupType.DELETE_CONFIRM]: DeleteConfirm,
  [PopupType.NOTIFICATION_MESSAGE]: NotificationMessage,
};

const CustomPopup = () => {
  const { popupKey, popupProps } = useAppSelector(popupSelector);
  if(!popupKey) return null;

  const Popup = PopupMap[popupKey as keyof PopupMapType];

  return <Popup {...popupProps} />;
};

export default CustomPopup;
