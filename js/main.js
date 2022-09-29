import './form-notice.js';
import {inActivePage} from './form-notice.js';
import {activePage} from './form-notice.js';
import {initMap} from './map.js';
import {loadMap} from './map.js';
import {makeMarker} from './map.js';
import {createNotices} from './util.js';

inActivePage();
loadMap(activePage);
initMap({lat: 35.6895, lng: 139.692});

const notices = createNotices(10);

notices.forEach((notice) => {
  makeMarker(notice.location, notice);
});
