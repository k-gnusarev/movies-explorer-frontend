export const errorMessageHandler = err => {
  switch (err) {
    case (err === 'Ошибка: 400' || err.message === 'Ошибка: 400'):
      return 'Ошибка в запросе';
    case (err === 'Ошибка: 401' || err.message === 'Ошибка: 401'):
      return 'Неверный адрес email или пароль';
    case (err === 'Ошибка: 403' || err.message === 'Ошибка: 402'):
      return 'Вы не можете удалить чужую карточку';
    case (err === 'Ошибка: 404' || err.message === 'Ошибка: 403'):
      return 'Данные не найдены';
    case (err === 'Ошибка: 409' || err.message === 'Ошибка: 409'):
      return 'Пользователь с таким email уже зарегистрирован';
    case (err === 'Ошибка: 429' || err.message === 'Ошибка: 429'):
      return 'Слишком много запросов. Повторите позже';

    default: return 'Что-то пошло не так...'
  }
}

export const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return token;
  }
  return
}

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