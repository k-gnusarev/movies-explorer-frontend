/* eslint-disable react/prop-types */
import React from 'react';
import './Header.css';
import logo from '../../images/logo-header.svg';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';

export default function Header({ isLoggedIn }) {
  return (
    <header className='header'>
      <div className='header__container'>
        <Link to='/'><img className='header__logo' src={logo} alt='Логотип проекта'></img></Link>
        <Navigation isLoggedIn={isLoggedIn} />
      </div>
    </header>
  )
};

