import {createNoticeElement} from './similiar-notices.js';

const map = L.map('map-canvas');
const inputAddressElement = document.querySelector('#address');

const makeMainPin = function (coordinates) {
  const mainPinIcon = L.icon ({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  return L.marker (coordinates, {
    draggable: true,
    icon: mainPinIcon,
  });
};

const getAddress = function (pin) {
  inputAddressElement.value = `${(pin.getLatLng().lat).toFixed(5)}, ${(pin.getLatLng().lng).toFixed(5)}`;
  pin.on('moveend', (evt) => {
    inputAddressElement.value = `${(evt.target.getLatLng().lat).toFixed(5)}, ${(evt.target.getLatLng().lng).toFixed(5)}`;
  });
};

const initMap = function (coordinates) {
  map.setView(coordinates, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  const mainPin = makeMainPin(coordinates);
  mainPin.addTo(map);
  getAddress(mainPin);
};

const loadMap = function (cb) {
  map.on('load', () => {
    cb();
  });
};

const makeMarker = function ({lat, lng}, notice) {
  const icon = L.icon ({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker ({
    lat,
    lng
  },
  {
    icon,
  });
  marker
    .addTo(map)
    .bindPopup(createNoticeElement(notice));
};

export {initMap, loadMap, makeMarker};
