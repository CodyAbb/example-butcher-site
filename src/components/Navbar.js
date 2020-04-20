import React, { StyleSheet } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li>
          <NavLink to="/" className="navlink">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="navlink">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/createorder" className="navlink">
            Create Order
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
