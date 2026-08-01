import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import PropTypes from "prop-types";
import { selectIsAuth } from "../redux/slices/auth";

const loaderStyles = {
  display: "block",
  margin: "60px auto",
};

function ProtectedRoute({ children }) {
  const isAuth = useSelector(selectIsAuth);
  const authStatus = useSelector((state) => state.auth.status);
  const hasToken = Boolean(window.localStorage.getItem("token"));

  if (hasToken && authStatus === "loading") {
    return <FadeLoader cssOverride={loaderStyles} color="#c778dd" />;
  }

  if (!isAuth) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
