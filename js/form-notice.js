const adFormElement = document.querySelector('.ad-form');
const mapFilterFormElement = document.querySelector('.map__filters');
const formHeaderElement = adFormElement.querySelector('.ad-form-header');
const inputTitleElement = adFormElement.querySelector('#title');
const inputTypeElement = adFormElement.querySelector('#type');
const inputPriceElement = adFormElement.querySelector('#price');
const inputAddressElement = adFormElement.querySelector('#address');
const inputTimeElement = adFormElement.querySelector('.ad-form__element--time');
const inTimeElement = adFormElement.querySelector('#timein');
const outTimeElement = adFormElement.querySelector('#timeout');
const inputRoomsElement = adFormElement.querySelector('#room_number');
const inputCapacityElement = adFormElement.querySelector('#capacity');
const inputFeaturesElement = adFormElement.querySelector('.features');
const inputDescriptionElement = adFormElement.querySelector('#description');
const inputImagesElement = adFormElement.querySelector('#images');
const inputHostingTypeElement = mapFilterFormElement.querySelector('#housing-type');
const inputHousingPriceElement = mapFilterFormElement.querySelector('#housing-price');
const inputHousingRoomsElement = mapFilterFormElement.querySelector('#housing-rooms');
const inputHousingGuestsElement = mapFilterFormElement.querySelector('#housing-guests');
const inputHousingFeaturesElement = mapFilterFormElement.querySelector('#housing-features');

const submitAdFormElement = adFormElement.querySelector('.ad-form__submit');

const pristine = new Pristine (adFormElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element'
});

const validateTitle = function (title) {
  return (title.length >= 30 && title.length <= 100);
};

pristine.addValidator(inputTitleElement, validateTitle, 'Длина заголовка должна быть не менее 30 символов и не более 100 символов');

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

pristine.addValidator(inputRoomsElement, validateCapacity, getCapacityMessage);
pristine.addValidator(inputCapacityElement, validateCapacity, getCapacityMessage);

inputRoomsElement.addEventListener('change', (evt) => {
  evt.preventDefault();
  pristine.validate(inputCapacityElement);
});

inputCapacityElement.addEventListener('change', (evt) => {
  evt.preventDefault();
  pristine.validate(inputRoomsElement);
});

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

pristine.addValidator(inputPriceElement, validatePrice, getPriceMessage);

const changeType = function () {
  switch (inputTypeElement.value) {
    case 'bungalow':
      inputPriceElement.placeholder = '0';
      break;
    case 'flat':
      inputPriceElement.placeholder = '1000';
      break;
    case 'hotel':
      inputPriceElement.placeholder = '3000';
      break;
    case 'house':
      inputPriceElement.placeholder = '5000';
      break;
    case 'palace':
      inputPriceElement.placeholder = '10000';
      break;
  }
  pristine.validate(getPriceMessage);
};

changeType();

inputTypeElement.addEventListener('change', (evt) => {
  evt.preventDefault();
  changeType();
});

inTimeElement.addEventListener('change', (evt) => {
  evt.preventDefault();
  switch (inTimeElement.value) {
    case '12:00':
      outTimeElement.value = '12:00';
      break;
    case '13:00':
      outTimeElement.value = '13:00';
      break;
    case '14:00':
      outTimeElement.value = '14:00';
      break;
  }
});

outTimeElement.addEventListener('change', (evt) => {
  evt.preventDefault();
  switch (outTimeElement.value) {
    case '12:00':
      inTimeElement.value = '12:00';
      break;
    case '13:00':
      inTimeElement.value = '13:00';
      break;
    case '14:00':
      inTimeElement.value = '14:00';
      break;
  }
});

const inActivePage = function () {
  adFormElement.classList.add('ad-form--disabled');
  formHeaderElement.disabled = true;
  inputTitleElement.disabled = true;
  inputTypeElement.disabled = true;
  inputPriceElement.disabled = true;
  inputAddressElement.disabled = true;
  inputTimeElement.disabled = true;
  inputRoomsElement.disabled = true;
  inputCapacityElement.disabled = true;
  inputFeaturesElement.disabled = true;
  inputDescriptionElement.disabled = true;
  inputImagesElement.disabled = true;

  mapFilterFormElement.classList.add('map__filters--disabled');
  inputHostingTypeElement.disabled = true;
  inputHousingPriceElement.disabled = true;
  inputHousingRoomsElement.disabled = true;
  inputHousingGuestsElement.disabled = true;
  inputHousingFeaturesElement.disabled = true;
};

const activePage = function () {
  adFormElement.classList.remove('ad-form--disabled');
  formHeaderElement.disabled = false;
  inputTitleElement.disabled = false;
  inputTypeElement.disabled = false;
  inputPriceElement.disabled = false;
  inputAddressElement.disabled = false;
  inputTimeElement.disabled = false;
  inputRoomsElement.disabled = false;
  inputCapacityElement.disabled = false;
  inputFeaturesElement.disabled = false;
  inputDescriptionElement.disabled = false;
  inputImagesElement.disabled = false;

  mapFilterFormElement.classList.remove('map__filters--disabled');
  inputHostingTypeElement.disabled = false;
  inputHousingPriceElement.disabled = false;
  inputHousingRoomsElement.disabled = false;
  inputHousingGuestsElement.disabled = false;
  inputHousingFeaturesElement.disabled = false;
};

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    console.log('Form is ready');
  } else {
    console.log('Form is not ready');
  }
});

export {inActivePage, activePage};
