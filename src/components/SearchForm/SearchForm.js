import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import search__icon from '../../images/search-icon.svg';

export default function SearchForm(props) {
  
  return (
    <section className='search'>
      <form className='search__form'>
        <img className='search__icon' src={search__icon} />
        <input placeholder='Фильм' className='search__input' required='true' />
        <button type='submit' className='search__button'>Найти</button>
      </form>
      <FilterCheckbox />
    </section>
  )
};
