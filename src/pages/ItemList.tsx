import { Button, Icon } from '@ahaui/react';
import PaginationTable from 'components/common/PaginationTable';
import { useTypedDispatch } from 'hooks';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { createItem, deleteItem, fetchItemsList, updateItem } from 'store/actions/itemActions';
import { closePopup, openPopup } from 'store/actions/popupActions';
import { PopupType } from 'store/reducers/popupReducer';
import { ItemPayload } from 'types/item';
import { DataTable } from 'types/table';
import { itemTableConstants } from 'utils/renderItemRow';

const LIMIT = 20;

const ItemList:React.FC = () => {
    const {categoryId} = useParams();
    const categoryIdNum = Number(categoryId);
    const dispatch = useTypedDispatch();
    const [data, setData] = useState<DataTable>();

  const closePopupHandler = () => {
    dispatch(closePopup());
  };

  const fetchData = async (offset: number) => {
      const data = await dispatch(fetchItemsList(offset, LIMIT, categoryIdNum))
      const { totalItems, items } = data;
      setData({ totalItems, items });
  };

  const openCreatePopup = () => {
    dispatch(
      openPopup({
        popupKey: PopupType.ITEM_FORM,
        popupProps: {
          title: "Add Item",
          closeHandler: closePopupHandler,
          onSubmit: (item) => handleCreate(item),
        },
      })
    );
  }

  const openUpdatePopup = (itemId: number, item: ItemPayload) => {
    dispatch(
      openPopup({
        popupKey: PopupType.ITEM_FORM,
        popupProps: {
          title: "Update Item",
          item: item,
          closeHandler: closePopupHandler,
          onSubmit: (item) => handleUpdate(itemId, item),
        },
      })
    );
  }

  const openDeleteConfirmPopup = (item: ItemPayload) => {
    dispatch(
      openPopup({
        popupKey: PopupType.DELETE_CONFIRM,
        popupProps: {
          title: "Delete Item",
          item: item,
          closeHandler: closePopupHandler,
          onSubmit: (itemId) => handleDelete(itemId),
        },
      })
    );
  }

  const handleCreate = async (item: ItemPayload) => {
    const res = await dispatch(createItem(categoryIdNum, item))
    if(res?.status === 201) {
      fetchData(0);
    }
  };

  const handleUpdate = async (itemId: number, item: ItemPayload) => {
    const res = await dispatch(updateItem(itemId, categoryIdNum, item))
    if(res?.status === 200) {
      closePopupHandler();
      fetchData(0);
    }
  };

  const handleDelete = async (id: number) => {
    const res = await dispatch(deleteItem(id, categoryIdNum))
    if(res?.status === 200) {
      // console.log(res);
      closePopupHandler();
      fetchData(0);
    }
  };

  return (
     <div className="u-textCenter">
      <PaginationTable
        data={data}
        tableName="Item"
        cols={itemTableConstants(openUpdatePopup, openDeleteConfirmPopup)}
        fetchData={fetchData}
        pageSize={LIMIT}
        CreateButton={
          <Button onClick={openCreatePopup}>
            <Button.Icon>
              <Icon size="medium" name="plus" />
            </Button.Icon>
            <Button.Label>Add Item</Button.Label>
          </Button>
        }
      />
    </div>
  )
}

export default ItemList
