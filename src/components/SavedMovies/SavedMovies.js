/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as utils from '../../utils/utils';

export default function SavedMovies({
  isLoggedIn,
  savedMovies,
  searchError,
  addMovie,
  removeMovie,
  renderedMovies,
  setRenderedMovies,
  checkSaved,
  inputMessage,
  handleShortClick
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [movies, setMovies] = useState(savedMovies);

  useEffect(() => {
    const moviesFilteredByName = utils.filterMoviesByName(savedMovies, searchQuery);
    const moviesList = utils.filterShortMovies(moviesFilteredByName, isShort);

    setMovies(moviesList);
  }, [savedMovies, searchQuery, isShort])

  function handleShortClick() {
    setIsShort(!isShort)
  }

  function handleSearchSubmit(query) {
    setSearchQuery(query);
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        onSubmit={handleSearchSubmit}
        isShort={isShort}
        handleShortClick={handleShortClick}/>
      <Preloader />
      <MoviesCardList
        movies={movies}
        searchError={searchError}
        addMovie={addMovie}
        removeMovie={removeMovie}
        savedMovies={savedMovies}
        renderedMovies={renderedMovies}
        setRenderedMovies={setRenderedMovies}
        checkSaved={checkSaved}
        inputMessage={inputMessage}
      />
      <Footer />
    </>
  )
};
