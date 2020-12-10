import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

function Header() {
  return (
      <header id="main-header">
          <div className="header-content">
              <Link to="/register">
                <span>Registro</span>
              </Link>
              <Link to="/login">
                <span>Login</span>
              </Link>
              <Link to="/profile">
                <span>Profile</span>
              </Link>
          </div>
      </header>
  )
}

export default Header;