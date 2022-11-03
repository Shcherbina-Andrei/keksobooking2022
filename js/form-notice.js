import './price-slider.js';
import {watchChangePriceSlider} from './price-slider.js';
import {changeMinPriceSlider} from './price-slider.js';
import {sendData} from './data-exchange.js';
import {resetFilter} from './filter-form.js';
import {getSuccessMessage, getErrorMessage} from './util.js';
import {validateTitle, validateCapacity, getCapacityMessage, validatePrice, getPriceMessage} from './util-validation.js';
import {setDefaultMainPin, closeMapPopup} from './map.js';
import './photo-uploader.js';
import {resetPhotoRoom, resetAvatar} from './photo-uploader.js';

const adFormElement = document.querySelector('.ad-form');
const inputTitleElement = adFormElement.querySelector('#title');
const inputTypeElement = adFormElement.querySelector('#type');
const inputPriceElement = adFormElement.querySelector('#price');
const inTimeElement = adFormElement.querySelector('#timein');
const outTimeElement = adFormElement.querySelector('#timeout');
const inputRoomsElement = adFormElement.querySelector('#room_number');
const inputCapacityElement = adFormElement.querySelector('#capacity');
const buttonSubmitElement = adFormElement.querySelector('.ad-form__submit');
const buttonResetElement = adFormElement.querySelector('.ad-form__reset');

watchChangePriceSlider(inputPriceElement);

const pristine = new Pristine (adFormElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element'
});

pristine.addValidator(inputTitleElement, validateTitle, 'Длина заголовка должна быть не менее 30 символов и не более 100 символов');
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

pristine.addValidator(inputPriceElement, validatePrice, getPriceMessage);

const changeType = function () {
  switch (inputTypeElement.value) {
    case 'bungalow':
      inputPriceElement.placeholder = '0';
      changeMinPriceSlider(0);
      break;
    case 'flat':
      inputPriceElement.placeholder = '1000';
      changeMinPriceSlider(1000);
      break;
    case 'hotel':
      inputPriceElement.placeholder = '3000';
      changeMinPriceSlider(3000);
      break;
    case 'house':
      inputPriceElement.placeholder = '5000';
      changeMinPriceSlider(5000);
      break;
    case 'palace':
      inputPriceElement.placeholder = '10000';
      changeMinPriceSlider(10000);
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

const blockSubmitButton = function () {
  buttonSubmitElement.disabled = true;
};

const unblockSubmitButton = function () {
  buttonSubmitElement.disabled = false;
};

const setUserFormReset = function (array) {
  buttonResetElement.addEventListener('click', () => {
    setDefaultMainPin();
    resetFilter(array);
    resetPhotoRoom();
    resetAvatar();
    closeMapPopup();
  });
};

const setUserFormSubmit = function () {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          setDefaultMainPin();
          closeMapPopup();
          adFormElement.reset();
          getSuccessMessage();
        },
        () => {
          unblockSubmitButton();
          getErrorMessage();
        },
        new FormData(evt.target)
      );
    }
  });
};

export {setUserFormSubmit, setUserFormReset};

