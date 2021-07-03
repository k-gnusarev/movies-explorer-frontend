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
  onSearch,
  movies,
  isPreloaderShown,
  isLoggedIn,
  searchError,
  addMovie,
  removeMovie,
  savedMovies,
  searchOptions,
  setSearchOptions
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [isShort, setIsShort] = useState(false);
  const [allMovies, setAllMovies] = useState([]);

  function handleShortClick() {
    setIsShort(!isShort)
    setSearchOptions({ isShort: !isShort, searchQuery })
  }

  function handleSearchSubmit(query) {
    setSearchQuery(query);
    if (!movies.length) {
      onSearch();
    }
    setSearchOptions({ isShort: !isShort, searchQuery: query })
  }

  useEffect(() => {
    // фильтруем фильмы по поисковому запросу
    const moviesFilteredByName = utils.filterMoviesByName(movies, searchQuery);
    const moviesList = utils.filterShortMovies(moviesFilteredByName, isShort);

    setAllMovies(moviesList);
  }, [movies, searchQuery, isShort])

  useEffect(() => {
    console.log(searchOptions);
    // отображаем результаты поиска после закрытия вкладки
    setSearchQuery(searchOptions.searchQuery);
    setIsShort(searchOptions.isShort)
  }, [])

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        onSubmit={handleSearchSubmit}
        isShort={isShort}
        handleShortClick={handleShortClick}
        searchOptions={searchOptions}
      />
      <Preloader
        isPreloaderShown={isPreloaderShown}
      />
      <MoviesCardList
        movies={allMovies}
        renderedMovies={renderedMovies}
        setRenderedMovies={setRenderedMovies}
        searchError={searchError}
        addMovie={addMovie}
        removeMovie={removeMovie}
        savedMovies={savedMovies}
      />
      <Footer />
    </>
  )
};

