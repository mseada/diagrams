import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <span>🍼</span>
        <span>Cairo Babysitter</span>
        <span className="ar">| مربيات القاهرة</span>
      </NavLink>
      <ul className="navbar-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/babysitters">Browse</NavLink></li>
        <li><NavLink to="/search">Search</NavLink></li>
        <li><NavLink to="/admin">Admin</NavLink></li>
      </ul>
    </nav>
  );
}
