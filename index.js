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
var gaFn;
var sendName;

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
  enable = config && config.id;
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
  gaFn = WIN[ analyticsCfg.fn ];
  sendName = analyticsCfg.name ? analyticsCfg.name + '.send' : 'send';

  // ga('create', 'UA-XXXXX-Y', 'auto');
  gaFn('create', analyticsCfg.id, 'auto', analyticsCfg.name);

  console.warn('analytics: ', analyticsCfg);

  return analyticsCfg;
}

/** pageView.
 * @public
 */
function pageView () {
  if (!enable) return;

  var path = null;
  if (analyticsCfg.isWidget) {
    // Widgets: include "host" in the path sent to pageview.
    path = LOC.host + LOC.pathname + LOC.search.replace(/^\?/, '!');
  }

  gaFn(sendName, 'pageview', path);
}

/** sendEvent.
 * @public
 */
function sendEvent (cat, act, label, value) {
  if (!enable) return;

  gaFn(sendName, 'event', cat, act, label, value);
  console.warn('analytics.event: ', cat, act, label, value);
}

/** includeJavascript.
 * @private
 */
function includeJavascript (gaName) {
  var existingJs = DOC.querySelector('script[ src *= google-analytics ]');

  if (!existingJs) {
     /* eslint-disable */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', gaName /* || 'ga' */);
     /* eslint-enable */
  }
}
