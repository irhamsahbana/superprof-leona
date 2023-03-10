import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowSidebar } from "../../redux/utilSlice";
import { Dropdown } from "antd";
import { logout } from "../../redux/userSlice";

export default function Header() {
  const { showSidebar } = useSelector((state) => state.utils);
  const { role } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const items = [
    {
      key: "1",
      label: (
        <p className="text-sm font-bold">
          {role === "admin" ? "Admin" : "Drg. Andy"}
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <p
          onClick={handleLogout}
          className="text-sm text-gray-600 cursor-pointer"
        >
          Logout
        </p>
      ),
    },
  ];

  return (
    <div className="flex justify-between w-full h-14 pt-2 pr-16 offset-x shadow-lg bg-slate-50">
      <button
        className="text-slate-900 text-lg pl-10"
        onClick={() => dispatch(setShowSidebar(!showSidebar))}
      >
        <HiMenu />
      </button>

      <Dropdown
        menu={{
          items,
        }}
        placement="bottom"
      >
        <img
          className="h-10 w-auto rounded-full cursor-pointer"
          src="https://cdn-icons-png.flaticon.com/512/64/64572.png?w=1060&t=st=1672611890~exp=1672612490~hmac=888fc9581cf578ba23f24705b94ce06a83ada6ab8e2a410bd38c7c286a0a4139"
          alt="Profile Avatar"
        />
      </Dropdown>
    </div>
  );
}
