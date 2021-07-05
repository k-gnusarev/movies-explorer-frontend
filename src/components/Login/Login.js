/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo-header.svg';
import { useFormWithValidation } from '../../utils/CallbackValidation';

export default function Login({ onLogin }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values.email, values.password)
  }

  return (
    <section className='login'>
      <div className='login__container'>
        <Link
          className='login__link'
          to='/'>
            <img
              className='login__logo'
              src={logo}
              alt='Перейти на главную страницу'
            />
        </Link>
        <h2 className='login__title'>Рады видеть!</h2>
        <form
          className='login__form'
          onSubmit={handleSubmit}
          noValidate={true}
        >
          <label className='login__label'>Email</label>
          <input
            type='email'
            className='login__input'
            id='email'
            name='email'
            required={true}
            value={values.email || ''}
            onChange={handleChange}
          />
          {errors.email && <span
            className='login__error-label'
          >{errors.email}</span>}
          <label className='login__label'>Пароль</label>
          <input
            type='password'
            minLength='8'
            className='login__input'
            required={true}
            id='password'
            name='password'
            value={values.password || ''}
            onChange={handleChange}
          />
          {errors.password && <span
            className='login__error-label'
          >{errors.password}</span>}
          <button
            className='login__button'
            disabled={!isValid}
          >Войти</button>
        </form>
        <p className='login__text'>Ещё не зарегистрированы? <Link to='/signup' className='login__link'>Регистрация</Link></p>
      </div>
    </section>
  )
};
