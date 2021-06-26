/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useLocation } from 'react-router-dom';

export default function Movies({
  checkSaved,
  onSearch,
  movies,
  isPreloaderShown,
  inputMessage
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [isShort, setIsShort] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [currentMovieList, setCurrentMovieList] = useState([]);

  const { pathname } = useLocation();

  function handleShortClick() {
    setIsShort(!isShort)
  }

  function handleSearchSubmit(query) {
    setSearchQuery(query);
    if (!movies.length) {
      onSearch();
    }
  }

  function filterMoviesByName(movieList, value) {
    return movieList.filter(movie => movie.nameRU.toLowerCase().includes(value.toLowerCase()))
  }

  function filterShortMovies(movieList, isChecked) {
    return movieList.filter(movie => isChecked ? movie.duration <= 40 : Number)
  }

  useEffect(() => {
    const moviesFilteredByName = filterMoviesByName(movies, searchQuery);
    const shortMovies = filterShortMovies(moviesFilteredByName, isShort);

    setAllMovies(shortMovies);
  }, [movies, searchQuery, isShort])

  return (
    <>
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
      />
    </>
  )
};

