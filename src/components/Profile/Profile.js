/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/CallbackValidation';
import Header from '../Header/Header';
import './Profile.css';


export default function Profile({ onLogout, onProfileUpdate, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onProfileUpdate(values.email, values.name)
  }

  useEffect(() => {
    setValues(currentUser)
  }, [currentUser])

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className='profile'>
        <h1 className='profile__greeting'>Привет, {currentUser.name}</h1>
        <form
          className='profile__form'
          onSubmit={handleSubmit}
          noValidate={true}
        >
          <label htmlFor='name' className='profile__form-label'>
            Имя 
            <input
              id='name'
              className='profile__input'
              type='text'
              minLength='2'
              maxLength='30'
              name='name'
              required={true}
              value={values.name || ''}
              onChange={handleChange}
              pattern='[а-яА-Яa-zA-ZёË\- ]{1,}'
            ></input>
          </label>
          {errors.name && <span
              className='profile__error-label'
            >{errors.name}</span>}
          <label htmlFor='email' className='profile__form-label'>
            Email 
            <input
              type='email'
              className='profile__input'
              id='email'
              name='email'
              required={true}
              value={values.email || ''}
              onChange={handleChange}
            />
          </label>
          {errors.email && <span
              className='profile__error-label'
            >{errors.email}</span>}
          <button
            className='profile__button profile__button_type_submit'
            type='submit'
            disabled={!isValid}
          >
            Сохранить
          </button>
          <button
            className='profile__button profile__button_type_logout'
            type='button'
            onClick={onLogout}
          >Выйти из аккаунта</button>
        </form>
      </section>
    </>
  )
};
