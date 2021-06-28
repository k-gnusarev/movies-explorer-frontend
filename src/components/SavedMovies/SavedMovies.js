/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function SavedMovies({
  isLoggedIn,
  savedMovies,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [movies, setMovies] = useState(savedMovies);
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm />
      <Preloader />
      <MoviesCardList
        movies={savedMovies}
      />
      <Footer />
    </>
  )
};
