import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../assets/logo-transparent.png";
import SidebarItems from "../../data/SidebarItems";
import DokSidebarItems from "../../data/DokSidebarItems";

export default function Sidebar() {
  // TODO: dropdown area hover active class (on location), transition effect
  const { role } = useSelector((state) => state.user);

  let location = useLocation();
  let [dropdown1, setDropdown1] = useState(false); // dropdown master data
  let [dropdown2, setDropdown2] = useState(false); // dropdown data transaksi

  const handleDropdown1 = () => {
    setDropdown1(!dropdown1);
  };

  const handleDropdown2 = () => {
    setDropdown2(!dropdown2);
  };

  const mapDropdownItems = (idx) => {
    return (
      <ul className="hidden md:block lg:block mb-8 ">
        {SidebarItems[idx].dropdownItems.map((dropdownItem, i) => (
          <Link key={i} to={dropdownItem.link}>
            <li className="text-gray-500 text-sm text-left flex items-center gap-x-4 cursor-pointer p-2 ml-12 hover:bg-slate-100 hover:text-slate-800 hover:font-bold rounded-md">
              &nbsp;&nbsp;{dropdownItem.name}
            </li>
          </Link>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className="bg-white p-2 pt-5 w-16 md:w-52 min-h-screen relative duration-500 shadow-xl">
        <div className="pb-16 flex flex-col justify-center items-center">
          <img className="w-40 h-auto" alt="Dentology" src={Logo} />
        </div>

        <ul>
          {(role.role === "admin" ? SidebarItems : DokSidebarItems).map((menuItem, i) => (
            <div key={i}>
              {menuItem.dropdown ? (
                <>
                  <button
                    className={`text-sm text-left flex sm:items-start w-full gap-x-4 cursor-pointer p-2 mb-4 hover:bg-slate-100 hover:rounded-md hover:text-slate-800 hover:font-semibold ${
                      location.pathname === menuItem.link
                        ? "bg-slate-600 text-slate-50  font-semibold rounded-md text-main-green"
                        : ""
                    }`}
                    onClick={() =>
                      menuItem.id === 2 ? handleDropdown1() : handleDropdown2()
                    }
                    key={i}
                  >
                    <span className="text-lg text-center md:ml-2 md:pt-2 lg:pt-0 w-4">
                      {menuItem.icon}
                    </span>
                    <span className="text-sm hidden md:flex">
                      {menuItem.name}
                    </span>
                  </button>

                  {menuItem.id === 2 && dropdown1 && mapDropdownItems(1)}
                  {menuItem.id === 3 && dropdown2 && mapDropdownItems(2)}
                </>
              ) : (
                <Link key={i} to={menuItem.link}>
                  <li
                    key={i}
                    className={`text-sm flex sm:items-start gap-x-4 cursor-pointer p-2 mb-4 hover:bg-slate-100 hover:rounded-md hover:text-slate-800 hover:font-semibold ${
                      location.pathname === menuItem.link
                        ? "bg-slate-600 text-slate-50 font-semibold rounded-md"
                        : ""
                    }`}
                  >
                    <span className="text-lg text-center md:ml-2 w-4">
                      {menuItem.icon}
                    </span>
                    <span
                      className={`text-sm text-left hidden md:flex`}
                    >
                      {menuItem.name}
                    </span>
                  </li>
                </Link>
              )}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
