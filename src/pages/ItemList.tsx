import { Button, Icon } from '@ahaui/react';
import { useQueryParam, NumberParam } from 'use-query-params';
import PaginationTable from 'components/common/table/PaginationTable';
import useAppSelector from 'hooks/useAppSelector';
import useTypedDispatch from 'hooks/useTypedDispatch';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  createItem, deleteItem, fetchItemsList, updateItem,
} from 'store/actions/itemActions';
import { closePopup, openPopup } from 'store/actions/popupActions';
import { selectToken, selectUserId } from 'store/reducers/authReducer';
import { PopupType } from 'store/reducers/popupReducer';
import { Item, ItemPayload } from 'types/item';
import { DataTable } from 'types/table';
import itemTableConstants from 'utils/renderItemRow';

const LIMIT = 20;

const ItemList:React.FC = () => {
  const { categoryId } = useParams();
  const categoryIdNum = Number(categoryId);
  const dispatch = useTypedDispatch();
  const [data, setData] = useState<DataTable>();
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);
  const userId = useAppSelector(selectUserId);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [page = 1, setPage] = useQueryParam('p', NumberParam);

  const closePopupHandler = () => {
    dispatch(closePopup());
  };

  const fetchData = async (page: number) => {
    setIsLoading(true);
    const offset = ((page - 1) * LIMIT);
    const data = await dispatch(fetchItemsList(offset, LIMIT, categoryIdNum));
    const { totalItems, items } = data;
    setData({ totalItems, items });
    setIsLoading(false);
  };

  useEffect(() => {
    if (page) {
      fetchData(page);
    }
  }, [page]);

  const handleNavigateLogin = () => {
    navigate('/login', { state: { prevPath: location.pathname } });
    dispatch(closePopup());
  };

  const handleCreate = async (item: ItemPayload) => {
    const hasSucceeded = await dispatch(createItem(categoryIdNum, item));
    if (hasSucceeded && page && data) {
      const lastPage = Math.ceil(data.totalItems / LIMIT);
      if (data.totalItems % LIMIT === 0) {
        setPage(lastPage + 1);
      } else if (page !== lastPage) {
        setPage(lastPage);
      } else {
        fetchData(page);
      }
    }
  };

  const handleUpdate = async (itemId: number, item: ItemPayload) => {
    const hasSucceeded = await dispatch(updateItem(itemId, categoryIdNum, item));
    if (hasSucceeded && page) {
      closePopupHandler();
      fetchData(page);
    }
  };

  const handleDelete = async (id: number) => {
    const hasSucceeded = await dispatch(deleteItem(id, categoryIdNum));
    if (hasSucceeded && data && page) {
      closePopupHandler();
      const lastPage = Math.ceil(data.totalItems / LIMIT);
      if ((data.totalItems % LIMIT) === 1 && page === lastPage) {
        setPage(page - 1);
      } else {
        fetchData(page);
      }
    }
  };

  const openLoginPopup = () => {
    dispatch(
      openPopup({
        popupKey: PopupType.LOGIN_CONFIRM,
        popupProps: {
          title: 'Action is not allowed?',
          closeHandler: closePopupHandler,
          onSubmit: () => handleNavigateLogin(),
        },
      }),
    );
  };

  const openCreatePopup = () => {
    if (!token) {
      openLoginPopup();
      return;
    }
    dispatch(
      openPopup({
        popupKey: PopupType.ITEM_FORM,
        popupProps: {
          title: 'Add Item',
          closeHandler: closePopupHandler,
          onSubmit: (item) => handleCreate(item),
        },
      }),
    );
  };

  const checkCreatorPermission = (itemAuthorId: number) => {
    if (!token) {
      openLoginPopup();
      return false;
    }
    if (userId && userId !== itemAuthorId) {
      dispatch(openPopup({
        popupKey: PopupType.NOTIFICATION_MESSAGE,
        popupProps: {
          title: 'Warning Message',
          closeHandler: closePopupHandler,
          onSubmit: () => closePopupHandler(),
        },
      }));
      return false;
    }
    return true;
  };

  const openUpdatePopup = (item: Item) => {
    if (!checkCreatorPermission(item.author.id)) return;
    dispatch(
      openPopup({
        popupKey: PopupType.ITEM_FORM,
        popupProps: {
          title: 'Update Item',
          item,
          closeHandler: closePopupHandler,
          onSubmit: (updatedItem: ItemPayload) => handleUpdate(item.id, updatedItem),
        },
      }),
    );
  };

  const openDeleteConfirmPopup = (item: Item) => {
    if (!checkCreatorPermission(item.author.id)) return;

    dispatch(
      openPopup({
        popupKey: PopupType.DELETE_CONFIRM,
        popupProps: {
          title: 'Delete Item',
          item,
          closeHandler: closePopupHandler,
          onSubmit: (itemId) => handleDelete(itemId),
        },
      }),
    );
  };

  return (
    <div className="u-textCenter">
      <PaginationTable
        data={data}
        tableName="Item"
        cols={itemTableConstants(openUpdatePopup, openDeleteConfirmPopup)}
        isLoading={isLoading}
        pageSize={LIMIT}
        page={page || 1}
        setPage={setPage}
        CreateButton={(
          <Button onClick={openCreatePopup}>
            <Button.Icon>
              <Icon size="medium" name="plus" />
            </Button.Icon>
            <Button.Label>Add Item</Button.Label>
          </Button>
        )}
      />
    </div>
  );
};

export default ItemList;
