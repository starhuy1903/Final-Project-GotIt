import { useAppSelector } from "hooks";
import { popupSelector, PopupType } from "store/reducers/popupReducer";
import CategoryForm, { CategoryFormProps } from "./CategoryForm";
import DeleteConfirm, { DeleteConfirmProps } from "./DeleteConfirm";
import ItemForm, { ItemFormProps } from "./ItemForm";

type PopupMapType = {
  [PopupType.CATEGORY_FORM]: React.FC<CategoryFormProps>;
  [PopupType.ITEM_FORM]: React.FC<ItemFormProps>;
  [PopupType.DELETE_CONFIRM]: React.FC<DeleteConfirmProps>;
};

const PopupMap: PopupMapType = {
  [PopupType.CATEGORY_FORM]: CategoryForm,
  [PopupType.ITEM_FORM]: ItemForm,
  [PopupType.DELETE_CONFIRM]: DeleteConfirm,
};

const CustomPopup = () => {
  const { popupKey, popupProps } = useAppSelector(popupSelector);
  if(!popupKey) return null;

  const Popup = PopupMap[popupKey as keyof PopupMapType];

  return <Popup {...popupProps} />;
};

export default CustomPopup;
