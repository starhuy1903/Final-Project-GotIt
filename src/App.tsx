import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthRoute from "./AuthRoute";
import NotiMessage from "./components/common/NotiMessage";
// import Popup from "components/common/Popup";
import CategoryDetailPage from "pages/CategoryDetailPage";
import PopupWrapper from "components/common/popup/index";

const App: React.FC = () => {
  return (
    <>
      <NotiMessage />
      {/* <Popup /> */}
      <PopupWrapper />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="categories" element={<CategoryDetailPage />} />

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
