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
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/">Sản Phẩm</Link>
          </li>
          <li>
            <Link to="/">About us</Link>
          </li>
          <li>
            <Link to="/">Liên hệ</Link>
          </li>
          {role ? (
            <li onClick={() => handleLogout()}><a href='/login'>Đăng xuất</a></li>
          ) : (
            <li>
              <Link to="/login">Đăng nhập</Link>
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
