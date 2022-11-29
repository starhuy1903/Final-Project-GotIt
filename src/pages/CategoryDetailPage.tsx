import { Button, Icon } from "@ahaui/react";
import categoryAPI from "api/categoryAPI";
import PaginationTable from "components/common/PaginationTable";
import { useTypedDispatch } from "hooks";
import React, { useState } from "react";
import { closePopup, setPopup } from "store/actions/popupActions";
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
    try {
      const res = await categoryAPI.fetchCategoriesList(offset, LIMIT);

      setData({ totalItems: res?.data.total_items, items: res?.data.items });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = () => {
    console.log("create");
    dispatch(
      setPopup({
        children: <h1>Hello World</h1>,
        isLoading: false,
        isOpen: true,
        title: "Welcome",
        closeHandler: closeModalHandler,
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
