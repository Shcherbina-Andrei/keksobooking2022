import './form-notice.js';
import {inActivePage} from './page-activation.js';
import {activePage} from './page-activation.js';
import {initMap} from './map.js';
import {loadMap} from './map.js';
import {getData} from './data-exchange.js';
import './data-exchange.js';
import {setUserFormSubmit} from './form-notice.js';
import {displayMarkers} from './filter-form.js';
import {setFilterListener} from './filter-form.js';
import {setUserFormReset} from './form-notice.js';

inActivePage();
loadMap(activePage);
initMap({lat: 35.6895, lng: 139.692});
setUserFormSubmit();

getData((marks) => {
  const array = marks;
  displayMarkers(array);
  setFilterListener(array, displayMarkers);
  setUserFormReset(array);
});
