import React from 'react';
import './Preloader.css';

export default function Preloader(props) {
  
  return (
    <div className='preloader'>
      <div className='preloader__container'>
          <span className='preloader__round'></span>
      </div>
    </div>
  )
};
