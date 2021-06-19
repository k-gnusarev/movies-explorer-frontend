import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox(props) {
  
  return (
    <div className='filter-checkbox'>
      <label htmlFor='short-films' className='filter-checkbox__switch'>
        <input id='short-films' type='checkbox' className='filter-checkbox__input' />
        <span className='filter-checkbox__slider' />
      </label>
      <p className='filter-checkbox__text'>Короткометражки</p>
    </div>
  )
};
