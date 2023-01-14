import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const RouteAuth = (props) => {
  const token = Cookie.get("access_token");
  if (!token) {
    return <Navigate to="/" />;
  }

  return <div>{props.children}</div>;
};

export default RouteAuth;
