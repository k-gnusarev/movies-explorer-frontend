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