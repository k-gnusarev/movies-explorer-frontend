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
import { getContent } from '../../utils/auth';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [isPreloaderShown, setIsPreloaderShown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    // Проверка валидности токена
    const token = localStorage.getItem('token');

    if (token) {
      getContent(token)
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
        .catch(err => console.error(utils.errorMessageHandler(err)))
    }
  }, [history])

  useEffect(() => {
    /* 
     * ПРоверка состояния авторизации и получение данных
     * пользователя с сервера
     */
    if (isLoggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
        .then(([userInfo, savedMovieList]) => {
          setCurrentUser(userInfo);
          setSavedMovies(savedMovieList);
          localStorage.setItem('savedMovies', JSON.stringify(savedMovieList));
        })
        .catch(err => console.error(utils.errorMessageHandler(err)))
    }
  }, [isLoggedIn])

  function handleProfileUpdate(email, name) {
    mainApi
      .updateUserInfo(email, name)
      .then(res => {
        if (res.ok) {
          setCurrentUser(res)
        }
      })
      .catch(err => console.error(utils.errorMessageHandler(err)))
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
        console.error(utils.errorMessageHandler(err))
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
        onsole.error(utils.errorMessageHandler(err))
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
      console.log('дебажим checkSavedMovies');
      console.log('------------------------');
      console.log('allMovies');
      console.log(allMovies);
      console.log('savedMovies');
      console.log(savedMovies);
      
      console.log('начинается forEach');
      console.log('savedMovie');
      console.log(savedMovie);
      console.log('------------------------');
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

  function handleSaveMovie(movie) {
    mainApi
      .addMovie(movie)
      .then(res => {
        const movies = [res, ...savedMovies];
        localStorage.setItem('savedMovies', JSON.stringify(movies));
        setSavedMovies(movies);
      })
      .catch(err => {
        console.error(utils.errorMessageHandler(err));
      })
  }

  function handleRemoveMovie(movie) {
    const movieId = movie.id || movie.movieId
    const userMovie = savedMovies.find(savedMovie => savedMovie.movieId === movieId)

    mainApi
      .deleteMovie(userMovie._id)
      .then(res => {
        if (res.ok) {
          const updatedSavedMovies = savedMovies.filter(deletedMovie => deletedMovie._id !== movieId)
          setSavedMovies(updatedSavedMovies);
          localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
        }
      })
      .catch(err => {
        console.error(utils.errorMessageHandler(err));
      })
  }

  function handleSaveClick(movie) {
    // if(!movie.isSaved && !movie._id) {
    //   console.log(movie.isSaved);
    //   console.log(movie._id);
    //   console.log(movie);
    //   console.log('handleRemoveMovie(movie) / true')
    // } else {
    //   console.log('handleSaveMovie(movie) / false'); 
    // }
    !movie.isSaved && !movie.id ? handleSaveMovie(movie) : handleRemoveMovie(movie); 
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
            onSaveClick={handleSaveClick}
            isLoggedIn={isLoggedIn}
          ></ProtectedRoute>)}
          {isLoggedIn && (<ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            savedMovies={savedMovies}
          ></ProtectedRoute>)}
          {isLoggedIn && (<ProtectedRoute
            path='/profile'
            component={Profile}
            onLogout={handleLogout}
            onProfileUpdate={handleProfileUpdate}
            isLoggedIn={isLoggedIn}
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
