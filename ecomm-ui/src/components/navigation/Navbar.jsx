/* eslint-disable react/prop-types */
import Styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

function Navbar({ pageTitle = "" }) {
  return (
    <nav className={Styles.Nav_Container}>
      <div className={Styles.Links_Container}>
        <h1>{pageTitle}</h1>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/about-us"
            >
              About Us
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={Styles.User_Container}>
        <div className={Styles.Icons}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        <div className={Styles.Icons}>
          <i className="fa-regular fa-bell"></i>
        </div>

        <div className={Styles.User}>
          <img src="https://randomuser.me/api/portraits/men/44.jpg" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
