const adFormElement = document.querySelector('.ad-form');
const formHeaderElement = adFormElement.querySelector('.ad-form-header');
const inputTitleElement = adFormElement.querySelector('#title');
const inputAddressElement = adFormElement.querySelector('#address');
const inputTimeElement = adFormElement.querySelector('.ad-form__element--time');
const inputFeaturesElement = adFormElement.querySelector('.features');
const inputTypeElement = adFormElement.querySelector('#type');
const inputPriceElement = adFormElement.querySelector('#price');
const inputDescriptionElement = adFormElement.querySelector('#description');
const inputImagesElement = adFormElement.querySelector('#images');
const mapFilterFormElement = document.querySelector('.map__filters');
const inputHostingTypeElement = mapFilterFormElement.querySelector('#housing-type');
const inputHousingPriceElement = mapFilterFormElement.querySelector('#housing-price');
const inputHousingRoomsElement = mapFilterFormElement.querySelector('#housing-rooms');
const inputHousingGuestsElement = mapFilterFormElement.querySelector('#housing-guests');
const inputHousingFeaturesElement = mapFilterFormElement.querySelector('#housing-features');
const inputRoomsElement = adFormElement.querySelector('#room_number');
const inputCapacityElement = adFormElement.querySelector('#capacity');

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

export {activePage, inActivePage};
