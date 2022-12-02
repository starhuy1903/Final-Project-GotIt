import { useAppSelector } from "hooks";
import { popupSelector, PopupType } from "store/reducers/popupReducer";
import CategoryForm, { CategoryFormProps } from "./CategoryForm";

type PopupMapType = {
  [PopupType.CATEGORY_FORM]: React.FC<CategoryFormProps>;
};

const PopupMap: PopupMapType = {
  [PopupType.CATEGORY_FORM]: CategoryForm,
};

const PopupMapping = () => {
  const { popupKey, popupProps } = useAppSelector(popupSelector);
  const Popup = PopupMap[popupKey as keyof PopupMapType];

  return popupKey ? <Popup {...popupProps} /> : null;
};

export default PopupMapping;
