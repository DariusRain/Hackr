import React from "react";
import Logo from "../common/Logo";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <div className="navbar">
      <NavLink to="/">
        <Logo />
      </NavLink>
      <div className="navbar-side">
        <NavLink to="/login">Login/Sign-Up</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
