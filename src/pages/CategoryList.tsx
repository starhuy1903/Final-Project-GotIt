import React, { useCallback, useEffect, useState } from 'react';
import { Button, Icon } from '@ahaui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryParam, NumberParam } from 'use-query-params';
import PaginationTable from 'components/common/table/PaginationTable';
import useAppSelector from 'hooks/useAppSelector';
import useTypedDispatch from 'hooks/useTypedDispatch';
import {
  createCategory, deleteCategory, fetchCategoriesList, updateCategory,
} from 'store/actions/category';
import { closePopup, openPopup } from 'store/actions/popup';
import { selectToken } from 'store/reducers/auth';
import { PopupType } from 'store/reducers/popup';
import { Category, CategoryPayload } from 'types/category';
import { DataTable } from 'types/table';
import categoryTableConstants from 'utils/renderCategoryRow';

const LIMIT = 20;

const CategoryList: React.FC = () => {
  const dispatch = useTypedDispatch();
  const [data, setData] = useState<DataTable>();
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);
  const [page = 1, setPage] = useQueryParam('p', NumberParam);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const closePopupHandler = () => {
    dispatch(closePopup());
  };

  const fetchData = useCallback(async (page: number) => {
    setIsLoading(true);
    const offset = ((page - 1) * LIMIT);
    const data = await dispatch(fetchCategoriesList(offset, LIMIT));
    const { totalItems, items } = data;
    setData({ totalItems, items });
    setIsLoading(false);
  }, [LIMIT, dispatch, fetchCategoriesList]);

  useEffect(() => {
    if (page) {
      fetchData(page);
    }
  }, [page]);

  const handleNavigateLogin = () => {
    navigate('/login', { state: { prevPath: location.pathname } });
    dispatch(closePopup());
  };

  const handleCreate = async (category: CategoryPayload) => {
    const hasSucceeded = await dispatch(createCategory(category));
    if (hasSucceeded) {
      closePopupHandler();
      if (data && page) {
        const lastPage = Math.ceil(data.totalItems / LIMIT) || 1;
        if (data.totalItems !== 0 && data.totalItems % LIMIT === 0) {
          setPage(lastPage + 1);
        } else if (page !== lastPage) {
          setPage(lastPage);
        } else {
          fetchData(1);
        }
      } else {
        fetchData(1);
      }
    }
    return hasSucceeded;
  };

  const handleUpdate = async (id: number, category: CategoryPayload) => {
    const hasSucceeded = await dispatch(updateCategory(id, category));
    if (hasSucceeded && page) {
      closePopupHandler();
      fetchData(page);
    }
    return hasSucceeded;
  };

  const handleDelete = async (id: number) => {
    const hasSucceeded = await dispatch(deleteCategory(id));
    if (hasSucceeded && data && page) {
      closePopupHandler();
      const lastPage = Math.ceil(data.totalItems / LIMIT);
      if (data.totalItems - 1 !== 0 && (data.totalItems % LIMIT) === 1 && page === lastPage) {
        setPage(page - 1);
      } else {
        fetchData(page);
      }
    }
    return hasSucceeded;
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
        popupKey: PopupType.CATEGORY_FORM,
        popupProps: {
          title: 'Add Category',
          closeHandler: closePopupHandler,
          onSubmit: (category) => handleCreate(category),
        },
      }),
    );
  };

  const openUpdatePopup = (category: Category) => {
    if (!token) {
      openLoginPopup();
      return;
    }
    dispatch(
      openPopup({
        popupKey: PopupType.CATEGORY_FORM,
        popupProps: {
          title: 'Update Category',
          item: category,
          closeHandler: closePopupHandler,
          onSubmit: (updatedCategory) => handleUpdate(category.id, updatedCategory),
        },
      }),
    );
  };

  const openDeleteConfirmPopup = (category: Category) => {
    if (!token) {
      openLoginPopup();
      return;
    }
    dispatch(
      openPopup({
        popupKey: PopupType.DELETE_CONFIRM,
        popupProps: {
          title: 'Delete Category',
          item: category,
          closeHandler: closePopupHandler,
          onSubmit: (id) => handleDelete(id),
        },
      }),
    );
  };

  return (
    <div className="u-textCenter">
      <PaginationTable
        data={data}
        tableName="Category"
        cols={categoryTableConstants(openUpdatePopup, openDeleteConfirmPopup)}
        isLoading={isLoading}
        pageSize={LIMIT}
        page={page || 1}
        setPage={setPage}
        CreateButton={(
          <Button onClick={openCreatePopup}>
            <Button.Icon>
              <Icon size="medium" name="plus" />
            </Button.Icon>
            <Button.Label>Add Category</Button.Label>
          </Button>
        )}
      />
    </div>
  );
};

export default CategoryList;
