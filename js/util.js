const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checks = ['12:00', '13:00', '14:00'];

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

const generateRandomPositiveNumber = function (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const generateFloatRandomNumber = function (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const generateNoRepeatNumber = function (min, max) {
  const numbers = [];
  return function () {
    let num = generateRandomPositiveNumber(min, max);
    if (numbers.length === (max - min + 1)) {
      return null;
    }
    while (numbers.includes(num)) {
      num = generateRandomPositiveNumber(min, max);
    }
    numbers.push(num);
    return num;
  };
};

const getRandomNumber = generateNoRepeatNumber(1, 10);

const getAuthor = function () {
  let avatarNumber = getRandomNumber();
  if (avatarNumber < 10) {
    avatarNumber = `0${  avatarNumber}`;
  }
  return {
    avatar: `img/avatars/user${avatarNumber}.png`
  };
};

const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const getFeatures = function() {
  const houseFeatures = [];
  const numberFeatures = generateRandomPositiveNumber(1, 6);
  for (let i = 0; i < numberFeatures; i++) {
    let featureString = features[generateRandomPositiveNumber(0, 5)];
    while (houseFeatures.includes(featureString)) {
      featureString = features[generateRandomPositiveNumber(0, 5)];
    }
    houseFeatures.push(featureString);
  }
  return houseFeatures;
};

const photosArray = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const getPhotos = function() {
  const randomPhotos = [];
  const numberPhotos = generateRandomPositiveNumber(1, 3);
  for (let i = 0; i < numberPhotos; i++) {
    let photoNum = photosArray[generateRandomPositiveNumber(0, 2)];
    while (randomPhotos.includes(photoNum)) {
      photoNum = photosArray[generateRandomPositiveNumber(0, 2)];
    }
    randomPhotos.push(photoNum);
  }
  return randomPhotos;
};

const getLocation = function () {
  return {
    lat: generateFloatRandomNumber(35.65000, 35.70000, 5),
    lng: generateFloatRandomNumber(139.70000, 139.80000, 5)
  };
};

const getOffer = function () {
  return {
    title: 'Классное жилье',
    address: `${generateFloatRandomNumber(1, 10)}, ${generateFloatRandomNumber(1, 10)}`,
    price: generateRandomPositiveNumber(3000, 20000),
    type: types[generateRandomPositiveNumber(0, 4)],
    rooms: generateRandomPositiveNumber(2, 5),
    guests: generateRandomPositiveNumber(2, 5),
    checkin: checks[generateRandomPositiveNumber(0, 2)],
    checkout: checks[generateRandomPositiveNumber(0, 2)],
    features: getFeatures(),
    description: 'Универсальное жилье. Которое понравится многим. Все, что нужно есть',
    photos: getPhotos()
  };
};

const getNotice = function () {
  return {
    author: getAuthor(),
    offer: getOffer(),
    location: getLocation()
  };
};

const createNotices = function(number) {
  const array = [];
  for (let i = 0; i < number; i++) {
    array.push(getNotice());
  }
  return array;
};

export {createNotices, getDataErrorMessage, getSuccessMessage, getErrorMessage};
