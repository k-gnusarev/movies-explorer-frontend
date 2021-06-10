import React from 'react';
import photo from '../../images/portfolio-photo.jpg';
import './AboutMe.css';

export default function AboutMe(props) {
  return (
    <section className='about-me'>
      <h2 id='student' className='about-me__title'>Студент</h2>
      <div className='about-me__description'>
        <h3 className='about-me__name'>Константин</h3>
        <p className='about-me__role'>Фронтенд-разработчик, 30 лет</p>
        <p className='about-me__brief'>Я родился и живу в Саратове, закончил институт электронной техники и машиностроения СГТУ.
          У меня есть кошка. Последние 2,5 года работал переводчиком в Гватемале, параллельно изучал 
          веб-разработку. Сейчас работаю фронтенд-разработчиком в Grid Dynamics. В свободное время выезжаю на велозаезды, а также
          посещаю различные музыкальные мероприятия, от симфонических концертов до подвальных техносетов.</p>
          <div className="about-me__links">
            <a href="https://www.facebook.com/cleansed.by.a.nightmare/" target="_blank" rel="noreferrer" className="about-me__link">Facebook</a>
            <a href="https://github.com/k-gnusarev" target="_blank" rel="noreferrer" className="about-me__link">Github</a>
          </div>
      </div>
      <img src={photo} alt='Константин' className='about-me__photo' />
    </section>
  )
};
