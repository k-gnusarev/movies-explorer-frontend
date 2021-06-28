/* eslint-disable react/prop-types */
import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo-header.svg';
import { validateForm } from '../../utils/formValidator';

export default function Register({ onRegister }) {
  const isLoggedIn = false;
  const { values, errors, isValid, handleChange } = validateForm();
  
  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values.email, values.password, values.name)
  }
  
  return (
    <section className='register'>
      <div className='register__container'>
        { !isLoggedIn && (
          <Link
            className='register__link'
            to='/'>
              <img
                className='register__logo'
                src={logo}
                alt='Перейти на главную страницу'
              />
          </Link>
        ) }
        
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form
          className='register__form'
          onSubmit={handleSubmit}
          noValidate={true}
        >
          <label className='register__label'>Имя</label>
          <input
            className='register__input'
            name='name'
            id='name'
            minLength='2'
            maxLength='30'
            required={true}
            type='text'
            onChange={handleChange}
            value={values.name || ''}
          />
          {errors.name && <span
            className='register__error-label'
          >{errors.name}</span>}
          <label className='register__label'>Email</label>
          <input
            type='email'
            className='register__input'
            id='email'
            name='email'
            required={true}
            value={values.email || ''}
            onChange={handleChange}
          />
          {errors.email && <span
            className='register__error-label'
          >{errors.email}</span>}
          <label className='register__label'>Пароль</label>
          <input
            type='password'
            minLength='8'
            className='register__input'
            required={true}
            id='password'
            name='password'
            value={values.password || ''}
            onChange={handleChange}
          />
          {errors.password && <span
            className='register__error-label'
          >{errors.password}</span>}
          <button
            className='register__button'
            disabled={!isValid}
          >Зарегистрироваться</button>
        </form>
        <p className='register__text'>Уже зарегистрированы? <Link to='/signin' className='register__link'>Войти</Link></p>
      </div>
    </section>
  )
};
