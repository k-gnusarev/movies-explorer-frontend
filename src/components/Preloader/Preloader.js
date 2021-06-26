/* eslint-disable react/prop-types */
import React from 'react';
import './Preloader.css';

export default function Preloader({ isPreloaderShown }) {
  
  return (
    <div className={`preloader ${isPreloaderShown ? 'preloader_shown' : ''}`}>
      <div className='preloader__container'>
        <span className='preloader__round'></span>
      </div>
    </div>
  )
};
