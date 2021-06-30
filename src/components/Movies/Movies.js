/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import * as utils from '../../utils/utils';

export default function Movies({
  checkSaved,
  onSearch,
  movies,
  isPreloaderShown,
  inputMessage,
  onSaveClick,
  isLoggedIn,
  searchError,
  addMovie,
  removeMovie,
  savedMovies
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [isShort, setIsShort] = useState(false);
  const [allMovies, setAllMovies] = useState([]);

  function handleShortClick() {
    setIsShort(!isShort)
  }

  function handleSearchSubmit(query) {
    setSearchQuery(query);
    if (!movies.length) {
      onSearch();
    }
  }

  useEffect(() => {
    const moviesFilteredByName = utils.filterMoviesByName(movies, searchQuery);
    const moviesList = utils.filterShortMovies(moviesFilteredByName, isShort);

    setAllMovies(moviesList);
  }, [movies, searchQuery, isShort])

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        onSubmit={handleSearchSubmit}
        isShort={isShort}
        handleShortClick={handleShortClick}
      />
      <Preloader
        isPreloaderShown={isPreloaderShown}
      />
      <MoviesCardList
        movies={allMovies}
        renderedMovies={renderedMovies}
        setRenderedMovies={setRenderedMovies}
        checkSaved={checkSaved}
        inputMessage={inputMessage}
        onSaveClick={onSaveClick}
        searchError={searchError}
        addMovie={addMovie}
        removeMovie={removeMovie}
        savedMovies={savedMovies}
      />
      <Footer />
    </>
  )
};

