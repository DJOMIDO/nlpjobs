// src/components/Navbar.tsx

import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-container">
        <div className="logo-wrapper">
          <img src={logo} alt="logo" />
        </div>
        <div className="NavLink-container">
          <div className="navlin-wrapper">
            <NavLink
              className={({ isActive }) =>
                isActive ? "NavLink active" : "NavLink"
              }
              to="/"
            >
              home
            </NavLink>
          </div>
          <div className="navlin-wrapper">
            <NavLink
              className={({ isActive }) =>
                isActive ? "NavLink active" : "NavLink"
              }
              to="/jobs"
            >
              jobs
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
