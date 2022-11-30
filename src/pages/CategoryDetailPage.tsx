import { Button, Icon } from "@ahaui/react";
import categoryAPI from "api/categoryAPI";
import CategoryForm from "components/CategoryForm";
import PaginationTable from "components/common/PaginationTable";
import { useTypedDispatch } from "hooks";
import React, { useState } from "react";
import { closePopup, setPopup } from "store/actions/popupActions";
import { PopupType } from "store/reducers/popupReducer";
import { DataTable } from "types/table";
import { camelCaseObjKeys } from "utils/convertObject";
import { categoryTableConstants } from "utils/renderCategoryRow";

const LIMIT = 20;

const CategoryDetailPage: React.FC = () => {
  const dispatch = useTypedDispatch();
  const [data, setData] = useState<DataTable>();

  const closeModalHandler = () => {
    dispatch(closePopup());
  };

  const fetchData = async (offset: number) => {
    try {
      const res = await categoryAPI.fetchCategoriesList(offset, LIMIT);

      const data = camelCaseObjKeys(res?.data);
      const { totalItems, items } = data;

      setData({ totalItems, items });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = () => {
    dispatch(
      setPopup({
        popupKey: PopupType.FORM_POPUP,
        popupProps: {
          children: <CategoryForm />,
          isLoading: false,
          isOpen: true,
          title: "Add Category",
          closeHandler: closeModalHandler,
        },
      })
    );
  };

  const handleUpdate = (num: number) => {
    console.log("edit");
  };

  const handleDelete = (num: number) => {
    console.log("delete");
  };

  return (
    <div className="u-textCenter">
      <PaginationTable
        data={data}
        tableName="Category"
        cols={categoryTableConstants(handleUpdate, handleDelete)}
        fetchData={fetchData}
        pageSize={LIMIT}
        CreateButton={
          <Button onClick={handleCreate}>
            <Button.Icon>
              <Icon size="medium" name="plus" />
            </Button.Icon>
            <Button.Label>Add Category</Button.Label>
          </Button>
        }
      />
    </div>
  );
};

export default CategoryDetailPage;
