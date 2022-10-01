const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const successMessageElement = document.querySelector('#success').content.querySelector('.success');

const isEscapeKey = function (evt) {
  return evt.key === 'Escape';
};

const getDataErrorMessage = function (text) {
  const message = errorMessageElement.cloneNode(true);
  message.querySelector('.error__message').innerText = text;

  message.querySelector('.error__button').innerText = 'Перезагрузить страницу';
  message.querySelector('.error__button').addEventListener('click', (evt) => {
    evt.preventDefault();
    message.remove();
    location.reload();
  }, {once: true});
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      message.remove();
    }
  }, {once: true});
  document.querySelector('body').appendChild(message);
};

const getSuccessMessage = function () {
  const message = successMessageElement.cloneNode(true);
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      message.remove();
    }
  }, {once: true});
  document.addEventListener('click', (evt) => {
    if (evt.target === message) {
      message.remove();
    }
  });
  document.querySelector('body').appendChild(message);
};

const getErrorMessage = function () {
  const message = errorMessageElement.cloneNode(true);
  document.querySelector('body').appendChild(message);
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      message.remove();
    }
  }, {once: true});
  document.addEventListener('click', (evt) => {
    if (evt.target === message) {
      message.remove();
    }
  });
  message.querySelector('.error__button').addEventListener('click', (evt) => {
    evt.preventDefault();
    message.remove();
  }, {once: true});
};


const debounce = function (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getDataErrorMessage, getSuccessMessage, getErrorMessage, debounce};
