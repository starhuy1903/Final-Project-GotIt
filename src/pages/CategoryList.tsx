import { Button, Icon } from '@ahaui/react';
import PaginationTable from 'components/common/table/PaginationTable';
import useAppSelector from 'hooks/useAppSelector';
import useTypedDispatch from 'hooks/useTypedDispatch';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createCategory, deleteCategory, fetchCategoriesList, updateCategory,
} from 'store/actions/categoryActions';
import { closePopup, openPopup } from 'store/actions/popupActions';
import { selectToken } from 'store/reducers/authReducer';
import { PopupType } from 'store/reducers/popupReducer';
import { CategoryPayload } from 'types/category';
import { DataTable } from 'types/table';
import categoryTableConstants from 'utils/renderCategoryRow';

const LIMIT = 20;

const CategoryList: React.FC = () => {
  const dispatch = useTypedDispatch();
  const [data, setData] = useState<DataTable>();
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);

  const closePopupHandler = () => {
    dispatch(closePopup());
  };

  const fetchData = async (offset: number) => {
    const data = await dispatch(fetchCategoriesList(offset, LIMIT));
    const { totalItems, items } = data;
    setData({ totalItems, items });
  };

  const handleNavigateLogin = () => {
    navigate('/login', { state: { prevPath: '/categories' } });
    dispatch(closePopup());
  };

  const handleCreate = async (category: CategoryPayload) => {
    const hasSucceeded = await dispatch(createCategory(category));
    if (hasSucceeded) {
      fetchData(0);
    }
  };

  const handleUpdate = async (id: number, category: CategoryPayload) => {
    const hasSucceeded = await dispatch(updateCategory(id, category));
    if (hasSucceeded) {
      closePopupHandler();
      fetchData(0);
    }
  };

  const handleDelete = async (id: number) => {
    const hasSucceeded = await dispatch(deleteCategory(id));
    if (hasSucceeded) {
      closePopupHandler();
      fetchData(0);
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
        popupKey: PopupType.CATEGORY_FORM,
        popupProps: {
          title: 'Add Category',
          closeHandler: closePopupHandler,
          onSubmit: (category) => handleCreate(category),
        },
      }),
    );
  };

  const openUpdatePopup = (id: number, category: CategoryPayload) => {
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
          onSubmit: (category) => handleUpdate(id, category),
        },
      }),
    );
  };

  const openDeleteConfirmPopup = (category: CategoryPayload) => {
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
        fetchData={fetchData}
        pageSize={LIMIT}
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
