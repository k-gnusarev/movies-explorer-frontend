import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer(props) {
  return (
    <footer className='footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm</p>
      <div className='footer__wrapper'>
        <p className='footer__copyright'>© 2020</p>
        <nav className='footer__nav'>
          <ul className='footer__list'>
            <li className='footer__item'>
              <a href='https://praktikum.yandex.ru/' target='_blank' rel='noreferrer' className='footer__link'>
                Яндекс.Практикум
              </a>
            </li>
            <li className='footer__item'>
              <a href='https://github.com/k-gnusarev/' target='_blank' rel='noreferrer' className='footer__link'>
                GitHub
              </a>
            </li>
            <li className='footer__item'>
              <a href='https://www.linkedin.com/mwlite/in/konstantin-gnusarev-555153133' target='_blank' rel='noreferrer' className='footer__link'>
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
};

