/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

export default function MoviesCard({
  movie,
  checkSaved
}) {
  const { nameEN, duration, image, trailer } = movie;

  const isSaved = checkSaved(movie);
  const routeLocation = useLocation().pathname;

  const parseDuration = duration => {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60;

    return `${hours > 0 ? hours + 'ч ': ''}${minutes}м`
  }

  function handleSaveClick() {
    onSaveClick(movie, isSaved)
  }

  function getImageUrl(imageLink) {
    return `https://api.nomoreparties.co${imageLink}`
  }

  // определяем по маршруту, какую иконку прорисовывать
  const deleteIcon = ( routeLocation === '/saved-movies' ? 'card__save-button_delete' : 'card__save-button_saved' );

  return (
    <li className='card'>
      <div className='card__title-section'>
        <div className='card__text-section'>
          <h2 className='card__title'>{nameEN}</h2>
          <p className='card__duration'>{parseDuration(duration)}</p>
        </div>
        <button
          onClick={handleSaveClick}
          className={`card__save-button ${ isSaved ? deleteIcon : '' }` }
        />
      </div>
      <a
        href={trailer}
        target='_blank'
        rel='noopener noreferrer'
      >
        <img
          alt={nameEN}
          src={getImageUrl(image.url)}
          className='card__photo'
        />
      </a>
    </li>
  )
};
