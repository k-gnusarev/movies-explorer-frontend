import React from 'react';
import './MoviesCard.css';
import movie__preview from '../../images/movie-preview.jpg';

export default function MoviesCard(props) {
  const [isSaved, setIsSaved] = React.useState(true);

  return (
    <div className='card'>
      <div className='card__title-section'>
        <div className='card__text-section'>
          <h2 className='card__title'>33 слова о дизайне</h2>
          <p className='card__duration'>1ч 47м</p>
        </div>
        <button onClick={() => setIsSaved(!isSaved)} className={isSaved ? 'card__save-button card__save-button_saved' : 'card__save-button' } />
      </div>
      <img src={movie__preview} className='card__photo' />
    </div>
  )
};
