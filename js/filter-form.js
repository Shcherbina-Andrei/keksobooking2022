import {makeMarkerGroup} from './map.js';
import {deleteMarkerGroups} from './map.js';

const mapFilterFormElement = document.querySelector('.map__filters');
const inputHousingTypeElement = mapFilterFormElement.querySelector('#housing-type');
const inputHousingPriceElement = mapFilterFormElement.querySelector('#housing-price');
const inputHousingRoomsElement = mapFilterFormElement.querySelector('#housing-rooms');
const inputHousingGuestsElement = mapFilterFormElement.querySelector('#housing-guests');
const inputHousingFeaturesElement = mapFilterFormElement.querySelector('#housing-features');
const inputFeaturesElements = inputHousingFeaturesElement.querySelectorAll('input');

const displayMarkers = function (notices, number = 10) {
  makeMarkerGroup(notices.slice(0, number));
};

const sortHousingType = function (notices) {
  let array = notices;
  switch (inputHousingTypeElement.value) {
    case 'any' :
      break;
    case 'bungalow' :
      array = notices.filter((notice) => notice.offer.type === 'bungalow');
      break;
    case 'flat' :
      array = notices.filter((notice) => notice.offer.type === 'flat');
      break;
    case 'hotel' :
      array = notices.filter((notice) => notice.offer.type === 'hotel');
      break;
    case 'house' :
      array = notices.filter((notice) => notice.offer.type === 'house');
      break;
    case 'palace' :
      array = notices.filter((notice) => notice.offer.type === 'palace');
      break;
  }

  return array;
};

const sortPriceNumber = function (notices) {
  let array = notices;
  switch (inputHousingPriceElement.value) {
    case 'any':
      break;
    case 'low':
      array = notices.filter((notice) => notice.offer.price < 10000);
      break;
    case 'middle':
      array = notices.filter((notice) => notice.offer.price >= 10000 && notice.offer.price < 50000);
      break;
    case 'high':
      array = notices.filter((notice) => notice.offer.price >= 50000);
      break;
  }
  return array;
};

const sortHousingRooms = function (notices) {
  let array = notices;
  switch (inputHousingRoomsElement.value) {
    case 'any':
      break;
    case '1':
      array = notices.filter((notice) => notice.offer.rooms === 1);
      break;
    case '2':
      array = notices.filter((notice) => notice.offer.rooms === 2);
      break;
    case '3':
      array = notices.filter((notice) => notice.offer.rooms === 3);
      break;
  }

  return array;
};

const sortHousingGuestsNumbers = function (notices) {
  let array = notices;
  switch (inputHousingGuestsElement.value) {
    case 'any':
      break;
    case '1':
      array = notices.filter((notice) => notice.offer.guests === 1);
      break;
    case '2':
      array = notices.filter((notice) => notice.offer.guests === 2);
      break;
    case '0':
      array = notices.filter((notice) => notice.offer.guests === 0);
      break;
  }

  return array;
};

const sortFeatures = function (notices) {
  let array = notices;
  const checkedFeatures = [];
  inputFeaturesElements.forEach((element) => {
    if (element.checked) {
      checkedFeatures.push(element.value);
    }
  });
  if (checkedFeatures.length === 0) {
    return array;
  }
  array = notices.filter((notice) => {
    if (!('features' in notice.offer)) {
      return false;
    }
    for (let i = 0; i < checkedFeatures.length; i++) {
      if (!(notice.offer.features.includes(checkedFeatures[i]))) {
        return false;
      }
    }
    return true;
  });

  return array;
};

const resetFilter = function (array) {
  inputHousingTypeElement.value = 'any';
  inputHousingPriceElement.value = 'any';
  inputHousingRoomsElement.value = 'any';
  inputHousingGuestsElement.value = 'any';
  inputFeaturesElements.forEach((element) => {
    element.checked = false;
  });
  deleteMarkerGroups();
  displayMarkers(array);
};

const setFilterListener = function (notices, cb) {
  mapFilterFormElement.addEventListener('change', (evt) => {
    evt.preventDefault();
    let array = notices;
    array = sortHousingType(array);
    array = sortPriceNumber(array);
    array = sortHousingRooms(array);
    array = sortHousingGuestsNumbers(array);
    array = sortFeatures(array);
    deleteMarkerGroups();
    cb(array);
  });
};

export {displayMarkers, setFilterListener, resetFilter};
