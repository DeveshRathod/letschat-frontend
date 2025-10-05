import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
