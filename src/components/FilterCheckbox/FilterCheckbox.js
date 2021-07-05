/* eslint-disable react/prop-types */
import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({
  isShort,
  onClick
}) {
  
  return (
    <div className='filter-checkbox'>
      <label htmlFor='short-films' className='filter-checkbox__switch'>
        <input
          id='short-films'
          type='checkbox'
          className='filter-checkbox__input'
          checked={isShort}
          onChange={onClick}
          />
        <span className='filter-checkbox__slider' />
      </label>
      <p className='filter-checkbox__text'>Короткометражки</p>
    </div>
  )
};
