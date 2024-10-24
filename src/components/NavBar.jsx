import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="bg-sky-400 h-14 ">
        <ul className="flex h-14 items-center gap-8 mx-8">
          <NavLink
            className={(e) => {
              return e.isActive ? "bg-sky-500" : "";
            }}
            to="/"
          >
            <li className="cursor-pointer p-4">Home</li>
          </NavLink>
          <NavLink
            className={(e) => {
              return e.isActive ? "bg-sky-500" : "";
            }}
            to="/register"
          >
            <li className="cursor-pointer p-4">Register</li>
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
