/*!
  A basic Google Analytics wrapper | © Nick Freear, 06-July-2017.
*/

module.exports = {
  create: create,
  pageView: pageView,
  sendEvent: sendEvent
};

var WIN = window;
var DOC = WIN.document;
var LOC = WIN.location;

var analyticsCfg = {};
var enable = false;

/** create
 * @public

 var config = {
   id: 'UA-XXXXX-Y', // Required.
   name: 'gaadWidget', // Required.
   fn: 'myGA' // Optional.
 };

 */
function create (config) {
  // Setup private vars.
  enable = config && config.id && config.name;
  analyticsCfg = config;

  if (!enable) {
    console.warn('no analytics');
    return;
  }

  analyticsCfg.fn = analyticsCfg.fn || 'ga';

  includeJavascript(analyticsCfg.fn);

  return createTracker();
}

/** createTracker.
 * @private
 */
function createTracker () {
  // ga('create', 'UA-XXXXX-Y', 'auto');
  WIN[ analyticsCfg.fn ]('create', analyticsCfg.id, 'auto', analyticsCfg.name);

  console.warn('analytics: ', analyticsCfg);

  return analyticsCfg;
}

/** pageView.
 * @public
 */
function pageView () {
  if (!enable) return;

  var path = LOC.host + LOC.pathname + LOC.search.replace(/^\?/, '!');

  // ga('send', 'pageview');
  WIN[ analyticsCfg.fn ](analyticsCfg.name + '.send', 'pageview', path);
}

/** sendEvent.
 * @public
 */
function sendEvent (cat, act, label, value) {
  if (!enable) return;

  // ga('send', 'event', cat, act, label, value);
  WIN[ analyticsCfg.fn ](analyticsCfg.name + '.send', 'event', cat, act, label, value);
  console.warn('analytics.event: ', cat, act, label, value);
}

/** includeJavascript.
 * @private
 */
function includeJavascript (gaFn) {
  var existingJs = DOC.querySelector('script[ src *= google-analytics ]');

  if (!existingJs) {
     /* eslint-disable */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', gaFn /* || 'ga' */);
     /* eslint-enable */
  }
}
