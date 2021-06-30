/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './MoviesCard.css';
import { Route, useLocation } from 'react-router-dom';
import * as utils from '../../utils/utils'
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function MoviesCard({
  movie,
  onSaveClick,
  addMovie,
  removeMovie,
  savedMovies
}) {
  const [isSaved, setIsSaved] = useState(false);

  const { nameEN, duration, image, trailerLink } = movie;
  const routeLocation = useLocation().pathname;

  // определяем по маршруту, какую иконку прорисовывать
  const savedIconClass = isSaved ? 'card__save-button_saved' : '' ;
  const deleteIconClass = ( routeLocation === '/movies' ? savedIconClass : 'card__save-button_delete' );

  useEffect(() => {
    if(savedMovies.length > 0) {
      !isSaved
      ? setIsSaved(savedMovies.some(savedMovie => savedMovie.movieId === movie._id && savedMovie.owner === CurrentUserContext._id))
      : setIsSaved(false)
    }
  }, [])

  const parseDuration = duration => {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60;

    return `${hours > 0 ? hours + 'ч ': ''}${minutes}м`
  }

  function handleSaveClick() {
    if (!isSaved) {
      addMovie(movie);
      setIsSaved(true);
    } else {

      const card = savedMovies.filter(savedMovie => savedMovie.movieId === movie.id);

      removeMovie(card[0]._id)
      setIsSaved(false)
    }
  }

  function handleDeleteClick() {
    removeMovie(movie._id)
    setIsSaved(false)
  }

  function handleCardClick() {
    
    routeLocation === '/movies'
    ? handleSaveClick()
    : handleDeleteClick()
  }

  return (
    <li className='card'>
      <div className='card__title-section'>
        <div className='card__text-section'>
          <h2 className='card__title'>{nameEN}</h2>
          <p className='card__duration'>{parseDuration(duration)}</p>
        </div>
        <button
          onClick={handleCardClick}
          className={`card__save-button ${ deleteIconClass }` }
        />
      </div>
      <a
        href={trailerLink}
        target='_blank'
        rel='noreferrer'
      >
        <img
          alt={nameEN}
          src={movie.image.url || movie.image}
          className='card__photo'
        />
      </a>
    </li>
  )
};
