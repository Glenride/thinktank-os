import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Echo/Reverb is loaded only by the pages that use it
// (Manuscripts/Create, Portfolio/Matrix) so the realtime
// libraries do not weigh down the public homepage bundle.

