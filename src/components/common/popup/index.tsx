import { useAppSelector } from "hooks";
import { popupSelector, PopupType } from "store/reducers/popupReducer";
import CategoryForm, { CategoryFormProps } from "./CategoryForm";
import DeleteConfirm, { DeleteConfirmProps } from "./DeleteConfirm";

type PopupMapType = {
  [PopupType.CATEGORY_FORM]: React.FC<CategoryFormProps>;
  [PopupType.DELETE_CONFIRM]: React.FC<DeleteConfirmProps>;
};

const PopupMap: PopupMapType = {
  [PopupType.CATEGORY_FORM]: CategoryForm,
  [PopupType.DELETE_CONFIRM]: DeleteConfirm,
};

const PopupMapping = () => {
  const { popupKey, popupProps } = useAppSelector(popupSelector);
  const Popup = PopupMap[popupKey as keyof PopupMapType];

  return popupKey ? <Popup {...popupProps} /> : null;
};

export default PopupMapping;
