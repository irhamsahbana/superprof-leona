import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
// components
import Sidebar from "../Sidebar";
import Header from "../Header";

export default function MainLayout({ children }) {
  const { showSidebar } = useSelector((state) => state.utils);

  let { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(isLoggedIn);
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="flex bg-gradient-to-tr from-slate-50 to-blue-50 min-h-screen min-w-max">
            {showSidebar && <Sidebar />}

            <div className="flex-1 min-w-max">
              <Header />
              <div className="pt-8 pl-16 pr-16 min-w-max">{children}</div>
            </div>
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
