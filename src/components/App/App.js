import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
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
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [searchOptions, setSearchOptions] = useState({
    searchQuery: '',
    isShort: false
  });
  const [savedMovies, setSavedMovies] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [isPreloaderShown, setIsPreloaderShown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [updateProfileMessage, setUpdateProfileMessage] = useState('');
  const [updateErrorState, setUpdateErrorState] = useState(false);

  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    // Проверка валидности токена
    const token = localStorage.getItem('token');

    if (token) {
      mainApi
        .getContent(token)
        .then(res => {
          if (res) {
            setCurrentUser({
              name: res.name,
              email: res.email
            });
            setIsLoggedIn(true);
            history.push(pathname);
          }
        })
        .catch(err => console.error(err.message))
    }
  }, [history])

  useEffect(() => {
    // при загрузке страницы:
    // извлекаем сохраненный поисковый запрос в стейт
    const searchOptions = JSON.parse(localStorage.getItem('searchOptions'));

    searchOptions ? setSearchOptions(searchOptions) : setSearchOptions({});
  }, [])

  useEffect(() => {
    // записываем поисковый запрос в хранилище
    localStorage.setItem('searchOptions', JSON.stringify(searchOptions))
  }, [searchOptions])

  useEffect(() => {
     // Проверка состояния авторизации и получение фильмов с сервера

    if (isLoggedIn) {
      mainApi
        .getMovies()
        .then(res => {
          setSavedMovies(res);
          localStorage.setItem('savedMovies', JSON.stringify(res));
        })
        .catch(err => console.error(err.message))
    }
  }, [isLoggedIn])

  function handleProfileUpdate(email, name) {
    mainApi
      .updateUserInfo(email, name)
      .then(res => {
        if (res) {
          setCurrentUser(res)
          setUpdateProfileMessage(messages.UPDATE_SUCCESS);
          setUpdateErrorState(false);
        }
      })
      .catch(err => {
        setUpdateProfileMessage(err.message);
        setUpdateErrorState(true);
        console.error(err.message)
      })
      .finally(() => {
        setTimeout(() => { setUpdateProfileMessage('') }, 5000)
      })
  }

  function handleLogin(email, password) {
    mainApi
      .login(email, password)
      .then(res => {
        if(res) {
          setIsLoggedIn(true);
          history.push('/movies')
        }
      })
      .catch(err => {
        console.error(err.message)
      })
  }

  function handleRegister(email, password, name) {
    mainApi
      .register(email, password, name)
      .then(res => {
        if(res) {
          handleLogin(email, password);
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  function handleLogout() {
    history.push('');
    setIsLoggedIn(false);
    localStorage.clear();
  }

  function checkSavedMovies(allMovies, savedMovies) {
    savedMovies.forEach(savedMovie => {
      const movie = allMovies.find(movie => movie.nameRU === savedMovie.nameRU);
      movie.isSaved = true
    })

    return allMovies
  }

  function getMovies() {
    setInputMessage('');
    setIsPreloaderShown(true);

    moviesApi
      .getMovies()
      .then(res => {
        const moviesWithAbsoluteUrl = res.map(movie => {
          const imageUrl = utils.getAbsoluteUrl(movie.image.url)
          movie.image.url = imageUrl
          return movie
        })
        
        localStorage.setItem('movies', JSON.stringify(moviesWithAbsoluteUrl));
        setMovies(checkSavedMovies(moviesWithAbsoluteUrl, savedMovies));
        setSearchError(messages.NOT_FOUND);
      })
      .catch(err => {
        setSearchError(messages.ERROR_500)
        console.error(err.message);
      })
      .finally(() => {
        setIsPreloaderShown(false);
      });
  }

  function handleSaveMovie(movie) {
    mainApi
      .addMovie(movie)
      .then(res => {
        const movies = [res.data, ...savedMovies];
        localStorage.setItem('savedMovies', JSON.stringify(movies));
        setSavedMovies(movies);
      })
      .catch(err => {
        console.error(err.message);
      })
  }

  function handleRemoveMovie(movie) {
    mainApi
      .deleteMovie(movie)
      .then(res => {
        console.log(res);
        const updatedSavedMovies = savedMovies.filter(deletedMovie => deletedMovie._id !== res._id)
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
      })
      .catch(err => {
        console.error(err.message);
      })
  }

  useEffect(() => {
    const allMovies = JSON.parse(localStorage.getItem('movies'));
    if (allMovies) {
      setMovies(checkSavedMovies(allMovies, savedMovies));
      setSearchError(messages.NOT_FOUND)
    } else {
      setMovies([]);
    }
  }, [savedMovies])

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path='/' exact>
            <Header isLoggedIn={isLoggedIn} />
            <Main />
            <Footer />
          </Route>
          {isLoggedIn && (<ProtectedRoute
            path='/movies'
            component={Movies}
            onSearch={getMovies}
            movies={movies}
            isPreloaderShown={isPreloaderShown}
            inputMessage={inputMessage}
            isLoggedIn={isLoggedIn}
            searchError={searchError}
            savedMovies={savedMovies}
            addMovie={handleSaveMovie}
            removeMovie={handleRemoveMovie}
            searchOptions={searchOptions}
            setSearchOptions={setSearchOptions}
          ></ProtectedRoute>)}
          {isLoggedIn && (<ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            savedMovies={savedMovies}
            searchError={searchError}
            addmovie={handleSaveMovie}
            removeMovie={handleRemoveMovie}
            onSearch={getMovies}
            movies={movies}
            isPreloaderShown={isPreloaderShown}
            inputMessage={inputMessage}
            searchOptions={searchOptions}
            setSearchOptions={setSearchOptions}
          ></ProtectedRoute>)}
          {isLoggedIn && (<ProtectedRoute
            path='/profile'
            component={Profile}
            onLogout={handleLogout}
            onProfileUpdate={handleProfileUpdate}
            isLoggedIn={isLoggedIn}
            updateMessage={updateProfileMessage}
            errorState={updateErrorState}
          ></ProtectedRoute>)}
          <Route path='/signin' exact>
            <Login
              onLogin={handleLogin}
            />
          </Route>
          <Route path='/signup' exact>
            <Register
              onRegister={handleRegister}
            />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
