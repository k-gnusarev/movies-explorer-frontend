export const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return token;
  }
  return
}

export const getAbsoluteUrl = link => `https://api.nomoreparties.co${link}`

export const getWindowWidth = () => window.innerWidth;

export const getCardsCount = () => {
  const width = getWindowWidth();

  switch (true) {
    case (width < 720):
      return 5;
    case (width < 920):
      return 8;
    case (width < 1279):
      return 12;
    default: return 12
  }
}

export const addMoreCards = () => {
  const width = getWindowWidth();

  switch (true) {
    case (width < 720):
      return 2;
    case (width < 920):
      return 2;
    case (width < 1279):
      return 3;
    default: return 4
  }
}

export const filterMoviesByName = (movieList, value) => movieList.filter(movie => movie.nameRU.toLowerCase().includes(value.toLowerCase()));

export const filterShortMovies = (movieList, isChecked) => movieList.filter(movie => isChecked ? movie.duration <= 40 : Number)

export const errorHandler = err => {
  switch (err) {
    case (400):
      return 'Введены неверные данные'
    case (401):
      return 'Неверный email или пароль'
    case (403):
      return 'Вы не можете удалить чужой фильм'
    case (404):
      return 'Запрошенный ресурс не найден'
    case (409):
      return 'Данный пользователь уже зарегистрирован'
    case (429):
      return 'От вас поступает слишком много запросов. Выпейте чаю и повторите попытку'
    default: return 'Что-то пошло не так...'
  }
}