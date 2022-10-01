const adFormElement = document.querySelector('.ad-form');
const inputRoomsElement = adFormElement.querySelector('#room_number');
const inputCapacityElement = adFormElement.querySelector('#capacity');
const inputTypeElement = adFormElement.querySelector('#type');
const inputPriceElement = adFormElement.querySelector('#price');

const validateTitle = function (title) {
  return (title.length >= 30 && title.length <= 100);
};

const settleOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

const validateCapacity = function () {
  return settleOption[inputRoomsElement.value].includes(inputCapacityElement.value);
};

const getCapacityMessage = function () {
  let rooms = 'комнаты';
  let guests = `${inputCapacityElement.value} гостей`;

  if (inputRoomsElement.value === '1') {
    rooms = 'комната';
  } else if (inputRoomsElement.value === '100') {
    rooms = 'комнат';
  }

  if (inputCapacityElement.value === '0' && inputRoomsElement.value !== '100') {
    return `${inputRoomsElement.value} ${rooms} для гостей`;
  }

  if (inputCapacityElement.value === '1') {
    guests = `${inputCapacityElement.value} гостя`;
  } else if (inputCapacityElement.value === '100') {
    guests = 'гостей';
  }

  return `${inputRoomsElement.value} ${rooms} не для ${guests}`;
};

const validatePrice = function (value) {
  let min;
  switch (inputTypeElement.value) {
    case 'bungalow':
      min = 0;
      break;
    case 'flat':
      min = 1000;
      break;
    case 'hotel':
      min = 3000;
      break;
    case 'house':
      min = 5000;
      break;
    case 'palace':
      min = 10000;
      break;
  }

  if (value.match(/^[0-9]+$/) && (value <= 100000) && (value >= min)) {
    return true;
  } else {
    return false;
  }
};

const getPriceMessage = function () {
  return `Стоимость должна быть в пределах от ${inputPriceElement.placeholder} до 100000`;
};

export {validateTitle, validateCapacity, getCapacityMessage, validatePrice, getPriceMessage};
