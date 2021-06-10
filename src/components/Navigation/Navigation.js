import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation(props) {
  return (
    <div className='navigation__container navigation__container_type_login'>
      <Link to="/signup" className="navigation__link navigation__link_type_signup">Регистрация</Link>
      <Link to="/signin" className="navigation__link navigation__link_type_signin">Войти</Link>
    </div>
  )
};

