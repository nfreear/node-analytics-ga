
[![Build Status][travis-icon]][travis]

# nfreear/node-analytics-ga

A basic wrapper around [Google Analytics][ga], that is Node and
Browserify-compatible, and tailored to embeddable widgets.

Used in ~ [GitHub: nfreear/gaad-widget][used]

Usage ~ `package.json`:

```json
{
  ...
  "dependencies": {
    ...
    "node-analytics-ga": "git+https://github.com/nfreear/node-analytics-ga.git#918d458d8a"
  },
}
```

Javascript:

```js
const analytics = require('node-analytics-ga');
const CONFIG = {
  isWidget: true,
  name: 'gaadWidget',
  id: 'UA-123456789-0'
};

analytics.create(CONFIG);
analytics.pageView();
```

---
License ~ [MIT][].

[mit]: https://nfreear.mit-license.org/2017-2018#!-node-analytics-ga "MIT License."
[used]: https://github.com/nfreear/gaad-widget
[ga]: https://developers.google.com/analytics/devguides/collection/analyticsjs/ "analytics.js"
[travis-icon]: https://travis-ci.org/nfreear/node-analytics-ga.svg?branch=master
[travis]: https://travis-ci.org/nfreear/node-analytics-ga "Build status — Travis-CI"
