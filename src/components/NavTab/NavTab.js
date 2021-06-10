import React from 'react';
import './NavTab.css';

export default function NavTab(props) {
  return (
    <nav className='navtab__container'>
      <ul className='navtab__list'>
        <li className='navtab__item'><a href='#project' className='navtab__link'>О Проекте</a></li>
        <li className='navtab__item'><a href='#techs' className='navtab__link'>Технологии</a></li>
        <li className='navtab__item'><a href='#student' className='navtab__link'>Студент</a></li>
      </ul>
    </nav>
  )
};
