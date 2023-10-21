import React, { ReactNode } from "react";
import Nav from "./Nav";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* Add Header, Sidebar, etc. here */}
      <Nav />
      {children}
      {/* Add Footer here */}
    </>
  );
};
