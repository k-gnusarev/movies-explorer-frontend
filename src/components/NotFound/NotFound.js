import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function NotFound(props) {
  const history = useHistory(); 
  
  return (
    <section className='not-found'>
      <div className='not-found__container'>
        <h2 className='not-found__title'>404</h2>
        <p className='not-found__text'>Страница не найдена</p>
        <p className='not-found__link' onClick={ () => history.goBack() }>Назад</p>
      </div>
    </section>
  )
};
