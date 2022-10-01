import {getDataErrorMessage} from './util.js';

const getData = function (onSuccess) {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((marks) => {
      onSuccess(marks);
    })
    .catch(() => {
      getDataErrorMessage('Ошибка загрузки данных');
    });
};

const sendData = function (onSuccess, onFail, body) {
  fetch('https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
