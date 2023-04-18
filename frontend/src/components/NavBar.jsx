import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

import "./NavBar.css";

export default function NavBar() {
  const { currentUser } = useCurrentUserContext();

  const [showNavbar, setShowNavBar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavBar(!showNavbar);
  };

  return (
    <div className="div_container_navbar">
      <div className="div_navbar_mobile">
        <button
          type="button"
          className={`nav_toggle_button ${showNavbar ? "open" : ""}`}
          onClick={handleShowNavbar}
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`navbar_mobile ${showNavbar ? "open" : ""}`}>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/"
              style={{ textDecoration: "none", color: "#eeeeee" }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/login"
              style={{ textDecoration: "none", color: "#eeeeee" }}
            >
              Login
            </NavLink>
          </li>
          {currentUser.id && (
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : undefined)}
                to="/makes"
                style={{ textDecoration: "none", color: "#eeeeee" }}
              >
                Makes
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="div_navbar_pc">
        <ul className="navbar_pc">
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/"
              style={{ textDecoration: "none", color: "#eeeeee" }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/login"
              style={{ textDecoration: "none", color: "#eeeeee" }}
            >
              Login
            </NavLink>
          </li>
          {currentUser.id && (
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : undefined)}
                to="/makes"
                style={{ textDecoration: "none", color: "#eeeeee" }}
              >
                Makes
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="div_logo_name">
        <h1>PokéDev</h1>
      </div>
    </div>
  );
}
