/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import * as utils from '../../utils/utils'

export default function MoviesCardList({
  movies,
  checkSaved,
  onSaveClick,
  searchError,
  addMovie,
  removeMovie,
  savedMovies,
}) {
  const [cardCount, setCardCount] = useState(utils.getCardsCount);
  const [addedCards, setAddedCards] = useState(utils.addMoreCards);

  const isCardListShown = movies.length > 0;
  const cardsShown = movies?.slice(0, cardCount);

  function handleResize() {
    const width = utils.getWindowWidth();

    switch (true) {
      case (width < 720):
        return setCardCount(5)
      case (width < 920):
        return setCardCount(8)
      case (width < 1279):
        return setCardCount(12)
      default: setCardCount(12)
    }
  }

  function handleMoreClick() {
    setCardCount(prev => prev + addedCards);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <div className='card-list'>
      <span className={`card-list__not-found-label ${isCardListShown ? 'no-display' : ''}`}>{searchError}</span>
      <ul className={`card-list__list ${ isCardListShown ? 'card-list__list_shown' : '' }`}>
        { isCardListShown && (
          cardsShown.map(movie => {
            return <MoviesCard
              key={movie._id || movie.id}
              movie={movie}
              checkSaved={checkSaved}
              onSaveClick={onSaveClick}
              addMovie={addMovie}
              removeMovie={removeMovie}
              savedMovies={savedMovies}
            />
          }))
        }
      </ul>
      {movies.length > cardCount && (<button
        className='card-list__more-button'
        onClick={handleMoreClick}
      >Ещё</button>)}
    </div>
  )
};
