import React from 'react';
import './Profile.css';

export default function Profile(props) {
  return (
    <section className='profile'>
      {/* Имя будет вытаскиваться из контекста */}
      <h1 className='profile__greeting'>Привет, Константин</h1>
      <form className='profile__form'>
        <label htmlFor='name' className='profile__form-label'>
          Имя 
          <input id='name' className='profile__input'></input>
        </label>
        <label htmlFor='name' className='profile__form-label'>
          Почта 
          <input id='name' className='profile__input'></input>
        </label>      
        <button className='profile__button profile__button_type_submit' type='submit'>Редактировать</button>
        <button className='profile__button profile__button_type_logout' type='button'>Выйти из аккаунта</button>
      </form>
    </section>
  )
};
