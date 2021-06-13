import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo-header.svg';

export default function Login(props) {
  return (
    <section className='login'>
      <div className='login__container'>

        <Link className='login__link' to='/'><img className='login__logo' src={logo} alt='Перейти на главную страницу' /></Link>
        <h2 className='login__title'>Рады видеть!</h2>
        <form className='login__form'>
          <label className='login__label'>Email</label>
          <input type='email' className='login__input' />
          <span className='login__error-label'>Текст ошибки</span>
          <label className='login__label'>Пароль</label>
          <input type='password' className='login__input' />
          <span className='login__error-label'>Текст ошибки</span>
          <button className='login__button'>Войти</button>
        </form>
        <p className='login__text'>Ещё не зарегистрированы? <Link to='/signup' className='login__link'>Регистрация</Link></p>
      </div>
    </section>
  )
};
