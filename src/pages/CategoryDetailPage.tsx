import { Button, Icon } from "@ahaui/react";
import PaginationTable from "components/common/PaginationTable";
import { useTypedDispatch } from "hooks";
import React, { useState } from "react";
import { createCategory, deleteCategory, fetchCategoriesList, updateCategory } from "store/actions/categoryActions";
import { closePopup, openPopup } from "store/actions/popupActions";
import { PopupType } from "store/reducers/popupReducer";
import { CategoryPayload } from "types/category";
import { DataTable } from "types/table";
import { categoryTableConstants } from "utils/renderCategoryRow";

const LIMIT = 20;

const CategoryDetailPage: React.FC = () => {
  const dispatch = useTypedDispatch();
  const [data, setData] = useState<DataTable>();

  const closeModalHandler = () => {
    dispatch(closePopup());
  };

  const fetchData = async (offset: number) => {
      const data = await dispatch(fetchCategoriesList(offset, LIMIT))
      const { totalItems, items } = data;
      setData({ totalItems, items });
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

  const openDeleteConfirmPopup = (category: CategoryPayload) => {
    dispatch(
      openPopup({
        popupKey: PopupType.DELETE_CONFIRM,
        popupProps: {        
          title: "Delete Category",
          item: category,
          closeHandler: closeModalHandler,
          onSubmit: (id) => handleDelete(id),
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

  const handleDelete = async (id: number) => {
    const res = await dispatch(deleteCategory(id))
    if(res?.status === 200) {
      // console.log(res);
      closeModalHandler();
      fetchData(0);
    }
  };

  return (
    <div className="u-textCenter">
      <PaginationTable
        data={data}
        tableName="Category"
        cols={categoryTableConstants(openUpdatePopup, openDeleteConfirmPopup)}
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
