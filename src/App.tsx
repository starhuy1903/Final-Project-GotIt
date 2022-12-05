import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthRoute from "./AuthRoute";
import NotiMessage from "./components/common/NotiMessage";
import CategoryDetailPage from "pages/CategoryDetailPage";
import CustomPopup from "components/common/popup/index";
import ItemList from "pages/ItemList";
import ItemDetail from "pages/ItemDetail";
import { TOKEN_KEY } from "./constants";
import { useTypedDispatch } from "hooks";
import { AuthActionType } from "store/actions";

const App: React.FC = () => {
  const token = localStorage.getItem(TOKEN_KEY)
  const dispatch = useTypedDispatch();
  if(token) {
    dispatch({type: AuthActionType.AUTH_USER, payload: token})
  }
  return (
    <>
      <NotiMessage />
      <CustomPopup />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="categories" element={<CategoryDetailPage />} />
          <Route path="categories/:categoryId" element={<ItemList />} />
          <Route path="categories/:categoryId/items/:itemId" element={<ItemDetail />} />

          <Route element={<AuthRoute />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
