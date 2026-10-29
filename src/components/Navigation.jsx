import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  const linkClass = ({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link');

  return (
    <nav className="navigation" aria-label="Navigasi utama">
      <ul>
        <li>
          <NavLink to="/" end className={linkClass}>
            Catatan
          </NavLink>
        </li>
        <li>
          <NavLink to="/archived" className={linkClass}>
            Arsip
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;