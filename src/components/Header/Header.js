import React from 'react';
import './Header.css';
import logo from '../../images/logo-header.svg';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header className={`header header_bg-color_dark`}>
      <div className='header__container'>
        <Link><img className='header__logo' src={logo} alt='Логотип проекта'></img></Link>
        <Navigation />
      </div>
    </header>
  )
};

