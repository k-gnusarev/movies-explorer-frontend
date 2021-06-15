import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import account__icon from '../../images/profile-icon.svg';
import { func } from 'prop-types';

export default function Navigation(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function toggleBurgerMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className='navigation__container'>
      <div className={`navigation__movies-block ${ props.loggedIn ? '' : 'no-display' }`}>
        <Link className='navigation__link navigation__link_type_movies' to='/movies'>Фильмы</Link>
        <Link className='navigation__link navigation__link_type_movies' to='/saved-movies'>Сохранённые фильмы</Link>
        <Link className='navigation__link navigation__link_type_account' to='/profile'>
          Аккаунт
          <img alt='Редактировать аккаунт' className='navigation__account-icon' src={account__icon} />
        </Link>
      </div>
      <div className={`navigation__login-block ${ props.loggedIn ? 'no-display' : '' }`}>
        <Link className='navigation__link navigation__link_type_signup' to='/signup'>
          Регистрация
        </Link>
        <Link className='navigation__link navigation__link_type_signin' to='/signin'>
          Войти
        </Link>
        
      </div>
      <button className={`navigation__burger-button ${ props.loggedIn ? '' : 'no-display' }`} onClick={ toggleBurgerMenu } />
      <div className={`navigation__burger-menu ${ isMenuOpen ? 'visible' : '' }`}>
        <button className='navigation__burger-button navigation__burger-button_type_close' onClick={ toggleBurgerMenu } />
        <div className={`navigation__burger-menu-container ${ isMenuOpen ? 'visible' : '' }`}>
          <div className='navigation__burger-links-block'>
            <Link to='/' className='navigation__burger-link'>Главная</Link>
            <Link to='/movies' className='navigation__burger-link'>Фильмы</Link>
            <Link to='/saved-movies' className='navigation__burger-link'>Сохранённые фильмы</Link>
            <Link to='/profile' className='navigation__burger-link navigation__burger-link_type_account'>
              Аккаунт
              <img alt='Редактировать аккаунт' className='navigation__account-icon' src={account__icon} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
};

