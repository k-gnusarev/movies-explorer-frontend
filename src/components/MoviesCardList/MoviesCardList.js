/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList({
  movies,
  renderedMovies,
  setRenderedMovies,
  checkSaved,
  inputMessage
}) {
  //const [renderedMovies, setRenderedMovies] = useState([]);
  const isCardListShown = movies.length > 0;
  const { pathname } = useLocation();

  return (
    <div className={`card-list ${ isCardListShown ? 'card-list_shown' : '' }`}>
      <ul className='card-list__list'>
        { isCardListShown && (
          movies.map(movie => {
            return <MoviesCard
              key={movie.movieId || movie.id}
              movie={movie}
              checkSaved={checkSaved}
            />
          }))
        }
      </ul>
      <button className='card-list__more-button'>Ещё</button>
    </div>
  )
};
