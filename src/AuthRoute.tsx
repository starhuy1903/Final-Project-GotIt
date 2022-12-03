import { useAppSelector } from 'hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { selectToken } from './store/reducers/authReducer';

const AuthRoute = () => {
  const token = useAppSelector(selectToken);

  return (
    <>
      {
    token ? <Navigate to="/" /> : <Outlet />
  }
    </>
  );
};

export default AuthRoute;
