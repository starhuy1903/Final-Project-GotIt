import { useAppSelector } from "hooks";
import { popupSelector, PopupType } from "store/reducers/popupReducer";
import FormPopup from "./FormPopup";

export type PopupProps = {
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
  closeHandler: () => void;
};

type PopupMapType = {
  [PopupType.FORM_POPUP]: React.FC<PopupProps>;
};

const PopupMap: PopupMapType = {
  [PopupType.FORM_POPUP]: FormPopup,
};

const PopupWrapper = () => {
  const { popupKey, popupProps } = useAppSelector(popupSelector);
  const Popup = PopupMap[popupKey as keyof PopupMapType];

  return <div>{popupKey ? <Popup {...popupProps} /> : null}</div>;
};

export default PopupWrapper;
