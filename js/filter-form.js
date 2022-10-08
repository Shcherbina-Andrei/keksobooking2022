import {makeMarkerGroup} from './map.js';
import {deleteMarkerGroups} from './map.js';

const mapFilterFormElement = document.querySelector('.map__filters');
const inputHousingTypeElement = mapFilterFormElement.querySelector('#housing-type');
const inputHousingPriceElement = mapFilterFormElement.querySelector('#housing-price');
const inputHousingRoomsElement = mapFilterFormElement.querySelector('#housing-rooms');
const inputHousingGuestsElement = mapFilterFormElement.querySelector('#housing-guests');
const inputHousingFeaturesElement = mapFilterFormElement.querySelector('#housing-features');
const inputFeaturesElements = inputHousingFeaturesElement.querySelectorAll('input');

const NOTICES_COUNT = 10;

const checkHouseType = function (notice) {
  if (inputHousingTypeElement.value === 'any') {
    return true;
  }
  return notice.offer.type === inputHousingTypeElement.value;
};

const checkPrice = function (notice) {
  switch (inputHousingPriceElement.value) {
    case 'any':
      return true;
    case 'low':
      return notice.offer.price < 10000;
    case 'middle':
      return notice.offer.price < 50000;
    case 'high':
      return notice.offer.price >= 50000;
  }
};

const checkHousingRooms = function (notice) {
  switch (inputHousingRoomsElement.value) {
    case 'any':
      return true;
    case '1':
      return notice.offer.rooms === 1;
    case '2':
      return notice.offer.rooms === 2;
    case '3':
      return notice.offer.rooms === 3;
  }
};

const checkHousingGuestsNumbers = function (notice) {
  switch (inputHousingGuestsElement.value) {
    case 'any':
      return true;
    case '1':
      return notice.offer.guests === 1;
    case '2':
      return notice.offer.guests === 2;
    case '3':
      return notice.offer.guests === 3;
    case '0':
      return notice.offer.guests === 0;
  }
};

const checkFeatures = function (notice) {
  const checkedFeatures = inputHousingFeaturesElement.querySelectorAll('input:checked');

  if (checkedFeatures.length === 0) {
    return true;
  }
  if (!notice.offer.features) {
    return false;
  }
  for (const element of checkedFeatures) {
    if (!(notice.offer.features.includes(element.value))) {
      return false;
    }
  }
  return true;
};

const filterNotices = function (notices) {
  const filteredNotices = [];
  for (const notice of notices) {
    if (filteredNotices.length >= NOTICES_COUNT) {
      break;
    }

    if (checkHouseType(notice) && checkPrice(notice) && checkHousingRooms(notice) && checkHousingGuestsNumbers(notice) && checkFeatures(notice)) {
      filteredNotices.push(notice);
    }
  }
  return filteredNotices;
};

const displayMarkers = function (notices) {
  makeMarkerGroup(filterNotices(notices));
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


const setFilterListener = function (notices) {
  mapFilterFormElement.addEventListener('change', (evt) => {
    evt.preventDefault();
    deleteMarkerGroups();
    displayMarkers(notices);
  });
};

export {setFilterListener, resetFilter, displayMarkers};
