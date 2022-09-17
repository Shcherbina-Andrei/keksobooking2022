const generateRandomPositiveNumber = function (min, max) {
  if (min < 0 || min >= max) {
    return 'Введите корректные значения';
  }
  return Math.floor(Math.random() * (max - min) + min);
};

const generateFloatRandomNumber = function (min, max, numbersAfter) {
  if (min < 0 || min >= max) {
    return 'Введите корректные значения';
  }
  return Number((Math.random() * (max - min) + min).toFixed(numbersAfter));
};
