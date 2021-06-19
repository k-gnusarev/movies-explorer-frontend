import React from 'react';
import './MoviesCard.css';
import movie__preview from '../../images/movie-preview.jpg';
import { useLocation } from 'react-router-dom';

export default function MoviesCard(props) {
  const routeLocation = useLocation().pathname;
  const [isSaved, setIsSaved] = React.useState(true);

  // определяем по маршруту, какую иконку прорисовывать
  const deleteIcon = ( routeLocation === '/saved-movies' ? 'card__save-button_delete' : 'card__save-button_saved' );

  return (
    <div className='card'>
      <div className='card__title-section'>
        <div className='card__text-section'>
          <h2 className='card__title'>33 слова о дизайне</h2>
          <p className='card__duration'>1ч 47м</p>
        </div>
        <button onClick={() => setIsSaved(!isSaved)} className={`card__save-button ${ isSaved ? deleteIcon : '' }` } />
      </div>
      <img alt='Постер к карточке' src={movie__preview} className='card__photo' />
    </div>
  )
};
