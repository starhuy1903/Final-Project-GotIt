import { Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import CategoryList from 'pages/CategoryList';
import CustomPopup from 'components/common/popup/index';
import ItemList from 'pages/ItemList';
import ItemDetail from 'pages/ItemDetail';
import { AuthActionType, fetchUserInfo } from 'store/actions';
import useTypedDispatch from 'hooks/useTypedDispatch';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthRoute from './AuthRoute';
import NotiMessage from './components/common/NotiMessage';
import { TOKEN_KEY } from './constants';

const App: React.FC = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (token) {
      dispatch({ type: AuthActionType.AUTH_TOKEN, payload: token });
      dispatch(fetchUserInfo());
    }
  }, [token]);
  return (
    <>
      <NotiMessage />
      <CustomPopup />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/:categoryId/items" element={<ItemList />} />
          <Route path="categories/:categoryId/items/:itemId" element={<ItemDetail />} />

          <Route element={<AuthRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
