class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // POST /movies

  addMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailer: movie.trailerLink,
        movieId: movie.id.toString(),
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co${movie.image.url}`
      })
    })
      .then( res => this._getResponseData(res) )
  }

  // GET /movies

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
    })
      .then( res => this._getResponseData(res) )
  }

  // DELETE /movies/:id

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then( res => this._getResponseData(res) )
  }

  // PATCH /users/me — обновляет профиль

  updateUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name,
        email,
      })
    })
      .then( res => this._getResponseData(res) )
  }

  // GET users/me — выдаёт текущего пользователя

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then( res => this._getResponseData(res) )
  }

  // авторизация пользователя

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      })
    })
      .then( res => this._getResponseData(res) )
      .then( data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          this._updateHeaders();
          return data.token;
        }

        return Promise.reject(new Error(`Что-то пошло не так... Код ошибки: ${data.status}`))
      })
  }

  // POST /users — регистрация пользователя

  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
      })
    })
      .then( res => this._getResponseData(res) )
  }

  // получение ответа на запрос с сервера

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Что-то пошло не так... Код ошибки: ${res.status}`))
  }

  _updateHeaders() {
    this._headers = {
      'Content-Type': 'application/json',
      // могут возникнуть непонятки с Bearer,
      // если возникнут проблемы с авторизацией
      // попробуй разобраться с этим местом
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  }

  handleError(err) {
    console.error(err);
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.kgnusaryov-project.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGJiM2FlMDRiMWQ3MjQ3NmExZTRjMjkiLCJpYXQiOjE2MjQ3MTUyNjgsImV4cCI6MTYyNTMyMDA2OH0.aGJfQ-ABxi9zsTkR2GEZhsIizq4mr4ZW0jGbQVcxKHk'
  }
});

export default mainApi;