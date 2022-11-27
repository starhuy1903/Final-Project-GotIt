import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthRoute from "./AuthRoute";
import NotiMessage from "./components/common/NotiMessage";
import Popup from "components/common/Popup";
import { Button } from "@ahaui/react";

const App: React.FC = () => {
  const [openPopup, setOpenPopup] = useState(true);
  return (
    <>
      <NotiMessage />
      {openPopup && <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

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
