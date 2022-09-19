import {createNotices} from './util.js';
import {displayNotices} from './similiar-notices.js';
import {inActivePage} from './form-notice.js';
import {activePage} from './form-notice.js';

inActivePage();
activePage();
displayNotices(createNotices(1));
