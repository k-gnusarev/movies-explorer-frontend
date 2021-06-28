/* eslint-disable react/prop-types */
import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function SavedMovies({ isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm />
      <Preloader />
      <MoviesCardList />
      <Footer />
    </>
  )
};
