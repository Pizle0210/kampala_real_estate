import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../config/firebase";

export default function PrivateRoute() {
  const [user] = useAuthState(auth);
  const { userInfo } = useSelector((state) => state.auth);
  return (userInfo && Object.keys(userInfo).length > 0) ||
    (user && Object.keys(user).length > 0) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
