import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './App.css';
import moviesApi from '../../utils/MoviesApi';
import * as utils from '../../utils/utils';
import * as messages from '../../utils/messages';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom/cjs/react-dom.development';

function App() {
  const [savedMovies, setSavedMovies] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [isPreloaderShown, setIsPreloaderShown] = useState(false);

  // проверка, является ли карточка сохраненной
  function checkSaved(movie) {
    return savedMovies.some( savedMovie => savedMovie.movieId === movie.movieId )
  }

  function checkSavedMovies(allMovies, savedMovies) {
    savedMovies.forEach(savedMovie => {
      const movie = allMovies.find(movie => movie.nameRU === savedMovie.nameRU);
      movie.isSaved = true;
    })

    return allMovies
  }

  function getMovies() {
    setInputMessage('');
    setIsPreloaderShown(true);

    moviesApi
      .getMovies()
      .then(res => {
        localStorage.setItem('movies', JSON.stringify(res));
        setMovies(checkSavedMovies(res, savedMovies));
        setInputMessage('Ничего не найдено');
      })
      .catch(err => {
        setInputMessage(messages.ERROR_500)
        console.error(utils.errorMessageHandler(err));
      })
      .finally(() => {
        setIsPreloaderShown(false);
      });
  }

  useEffect(() => {
    const allMovies = JSON.parse(localStorage.getItem('movies'));
    if (allMovies) {
      setMovies(checkSavedMovies(allMovies, savedMovies));
      setInputMessage(messages.NOT_FOUND)
    } else {
      setInputMessage(messages.INPUT_QUERY);
      setMovies([]);
    }
  }, [savedMovies])

  return (
    <div className="page">
      <Switch>
        <Route path='/' exact>
          <Header loggedIn={false} />
          <Main />
          <Footer />
        </Route>
        <Route path='/movies' exact>
          <Header loggedIn={true} />
          <Movies
            checkSaved={checkSaved}
            onSearch={getMovies}
            movies={movies}
            isPreloaderShown={isPreloaderShown}
            inputMessage={inputMessage}
          />  
          <Footer />
        </Route>
        <Route path='/saved-movies' exact>
          <Header loggedIn={true} />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path='/profile' exact>
          <Header loggedIn={true} />
          <Profile />
        </Route>
        <Route path='/signin' exact>
          <Login />
        </Route>
        <Route path='/signup' exact>
          <Register />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
