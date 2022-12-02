import { Button, Icon } from "@ahaui/react";
import categoryAPI from "api/categoryAPI";
import PaginationTable from "components/common/PaginationTable";
import { useTypedDispatch } from "hooks";
import React, { useState } from "react";
import { createCategory, updateCategory } from "store/actions/categoryActions";
import { closePopup, openPopup } from "store/actions/popupActions";
import { PopupType } from "store/reducers/popupReducer";
import { CategoryPayload } from "types/category";
import { DataTable } from "types/table";
import { convertSnakeCaseToCamelCase } from "utils/convertObject";
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

      const data = convertSnakeCaseToCamelCase(res?.data);
      const { totalItems, items } = data;

      setData({ totalItems, items });
    } catch (err) {
      console.log(err);
    }
  };

  const openCreatePopup = () => {
    dispatch(
      openPopup({
        popupKey: PopupType.CATEGORY_FORM,
        popupProps: {        
          title: "Add Category",
          closeHandler: closeModalHandler,
          onSubmit: (category) => handleCreate(category),
        },
      })
    );
  }

  const openUpdatePopup = (id: number, category: CategoryPayload) => {
    dispatch(
      openPopup({
        popupKey: PopupType.CATEGORY_FORM,
        popupProps: {        
          title: "Update Category",
          item: category,
          closeHandler: closeModalHandler,
          onSubmit: (category) => handleUpdate(id, category),
        },
      })
    );
  }

  const handleCreate = async (category: CategoryPayload) => {
    const res = await dispatch(createCategory(category))
    if(res?.status === 201) {
      // console.log(res);
      fetchData(0);
    }
  };

  const handleUpdate = async (id: number, category: CategoryPayload) => {
    const res = await dispatch(updateCategory(id, category))
    if(res?.status === 200) {
      // console.log(res);
      closeModalHandler();
      fetchData(0);
    }
  };

  const handleDelete = (num: number) => {
    console.log("delete");
  };

  return (
    <div className="u-textCenter">
      <PaginationTable
        data={data}
        tableName="Category"
        cols={categoryTableConstants(openUpdatePopup, handleDelete)}
        fetchData={fetchData}
        pageSize={LIMIT}
        CreateButton={
          <Button onClick={openCreatePopup}>
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
