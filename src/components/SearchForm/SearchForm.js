/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import search__icon from '../../images/search-icon.svg';

export default function SearchForm({
  onSubmit,
  isShort,
  handleShortClick
}) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('')

  function handleChange(evt) {
    setQuery(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!query) {
      setError(INPUT_KEYWORD)
    } else {
      setError('');
      onSubmit(query.trim(''))
    }
  }

  return (
    <section className='search'>
      <form className='search__form' onSubmit={handleSubmit}>
        <img className='search__icon' src={search__icon} />
        <input
          placeholder='Фильм'
          className='search__input'
          required={true}
          onChange={handleChange}
          value={query}
        />
        <button type='submit'
          className='search__button'
        >Найти</button>
      </form>
      <span className='search__error-label'>{error}</span>
      <FilterCheckbox
        isShort={isShort}
        onClick={handleShortClick}
      />
    </section>
  )
};
