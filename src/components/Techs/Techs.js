import React from 'react';
import './Techs.css';

export default function Techs(props) {
  return (
    <section className='techs'>
      <h2 id='techs' className='techs__title'>Технологии</h2>
      <h3 className='techs__subtitle'>7 Технологий</h3>
      <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className='techs__list'>
        <li className='techs__list-item'>HTML</li>
        <li className='techs__list-item'>CSS</li>
        <li className='techs__list-item'>React</li>
        <li className='techs__list-item'>Git</li>
        <li className='techs__list-item'>Express</li>
        <li className='techs__list-item'>MongoDB</li>
      </ul>
    </section>
  )
};
