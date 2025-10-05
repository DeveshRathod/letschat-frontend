import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../store/useUserStore.js";

const ProtectedRoute = () => {
  const { isSignedIn, Check } = useUserStore();

  useEffect(() => {
    const verify = async () => {
      await Check();
    };

    verify();
  }, []);

  return isSignedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
