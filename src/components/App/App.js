import React from 'react';
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

function App() {
  return (
    <div className="page">
      <Switch>
        <Route path='/' exact>
          <Header />
          <Main />
          <Footer />
        </Route>
        <Route path='/movies' exact>
          <Header />
          <Movies />
          <Footer />
        </Route>
        <Route path='/saved-movies' exact>
          <Header />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path='/profile' exact>
          <Header />
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
