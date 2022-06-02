import React, { useState } from 'react';
import Menu from './svg/bars-solid.svg';
import Close from './svg/times-solid.svg';
import './css/header.css';
import { Link } from 'react-router-dom';

const Navbar = ({ role }: any) => {

  const handleLogout = () => {
    localStorage.removeItem('token')
  }

  return (
    <header>
      <div className="logo">iClass</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Product</Link>
          </li>
          <li>
            <Link to="/">About us</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
          {role ? (
            <li onClick={() => handleLogout()}><a href='/login'>Logout</a></li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}

          <li className="close">
            <img src={Close} width="20" />
          </li>
        </ul>
      </nav>
      <div className="menu">
        <img src={Menu} width="20" />
      </div>
    </header>
  );
};

export default Navbar;
