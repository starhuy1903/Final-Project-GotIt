import { Button } from "@ahaui/react";
import PaginationTablePage from "components/common/PaginationTablePage";
import { useTypedDispatch } from "hooks";
import React from "react";
import {
  closePopup,
  openPopup,
  resetPopup,
  setPopup,
} from "store/actions/popupActions";

const CategoryDetailPage: React.FC = () => {
  const dispatch = useTypedDispatch();

  const closeModalHandler = () => {
    dispatch(closePopup());
  };
  return (
    <div className="u-textCenter">
      <Button
        className="u-marginTopHuge"
        onClick={() =>
          dispatch(
            setPopup({
              children: <h1>Hello World</h1>,
              isLoading: false,
              isOpen: true,
              title: "Welcome",
              closeHandler: closeModalHandler,
            })
          )
        }
      >
        Open Popup
      </Button>
      <PaginationTablePage />
    </div>
  );
};

export default CategoryDetailPage;
