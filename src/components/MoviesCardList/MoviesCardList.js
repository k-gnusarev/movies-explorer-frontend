import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
  
  return (
    <div className='card-list'>
      <ul className='card-list__list'>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button className='card-list__more-button'>Ещё</button>
    </div>
  )
};
