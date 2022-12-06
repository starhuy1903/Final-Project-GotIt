import { Button, Icon } from '@ahaui/react';
import PaginationTable from 'components/common/table/PaginationTable';
import { useAppSelector, useTypedDispatch } from 'hooks';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createItem, deleteItem, fetchItemsList, updateItem } from 'store/actions/itemActions';
import { closePopup, openPopup } from 'store/actions/popupActions';
import { selectToken, selectUserId } from 'store/reducers/authReducer';
import { PopupType } from 'store/reducers/popupReducer';
import { Item, ItemPayload } from 'types/item';
import { DataTable } from 'types/table';
import { itemTableConstants } from 'utils/renderItemRow';

const LIMIT = 20;

const ItemList:React.FC = () => {
    const {categoryId} = useParams();
    const categoryIdNum = Number(categoryId);
    const dispatch = useTypedDispatch();
    const [data, setData] = useState<DataTable>();
    const navigate = useNavigate();
    const token = useAppSelector(selectToken)
    const userId = useAppSelector(selectUserId)

  const closePopupHandler = () => {
    dispatch(closePopup());
  };

  const fetchData = async (offset: number) => {
      const data = await dispatch(fetchItemsList(offset, LIMIT, categoryIdNum))
      const { totalItems, items } = data;
      setData({ totalItems, items });
  };

  const handleNavigateLogin = () => {
    navigate("/login", {state: {prevPath: `/categories/${categoryIdNum}`}})
    dispatch(closePopup());
  }

  const openLoginPopup = () => {
    dispatch(
      openPopup({
        popupKey: PopupType.LOGIN_CONFIRM,
        popupProps: {
          title: "Action is not allowed?",
          closeHandler: closePopupHandler,
          onSubmit: () => handleNavigateLogin(),
        },
      })
    );
  }

  const openCreatePopup = () => {
     if(!token) {
      openLoginPopup()
      return
    }
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

  const checkCreatorPermission = (itemAuthorId: number) => {
         if(!token) {
      openLoginPopup()
      return
    }
    if(userId && userId !== itemAuthorId) {
      dispatch(openPopup({
        popupKey: PopupType.NOTIFICATION_MESSAGE,
        popupProps: {
          title: "Warning Message",
          closeHandler: closePopupHandler,
          onSubmit: () => closePopupHandler(),
        },
      }))
      return false;
    }
    return true;
  }

  const openUpdatePopup = (item: Item) => {
    if(!checkCreatorPermission(item.author.id)) return;

    dispatch(
      openPopup({
        popupKey: PopupType.ITEM_FORM,
        popupProps: {
          title: "Update Item",
          item: item,
          closeHandler: closePopupHandler,
          onSubmit: (item) => handleUpdate(item.id, item),
        },
      })
    );
  }

  const openDeleteConfirmPopup = (item: Item) => {
    if(!checkCreatorPermission(item.author.id)) return;

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
    const hasSucceeded = await dispatch(createItem(categoryIdNum, item))
    if(hasSucceeded) {
      fetchData(0);
    }
  };

  const handleUpdate = async (itemId: number, item: ItemPayload) => {
    const hasSucceeded = await dispatch(updateItem(itemId, categoryIdNum, item))
    if(hasSucceeded) {
      closePopupHandler();
      fetchData(0);
    }
  };

  const handleDelete = async (id: number) => {
    const hasSucceeded = await dispatch(deleteItem(id, categoryIdNum))
    if(hasSucceeded) {
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
