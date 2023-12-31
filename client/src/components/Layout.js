import React from "react";
import { Outlet } from "react-router-dom";

//The one parent component which an be used to add something that we want to show on all the pages of the app
const Layout = () => {
  return <Outlet />;
};

export default Layout;
