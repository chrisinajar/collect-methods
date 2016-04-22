# collect-methods [![Build Status](https://travis-ci.org/chrisinajar/collect-methods.svg?branch=master)](https://travis-ci.org/chrisinajar/collect-methods) [![devDependency Status](https://david-dm.org/chrisinajar/collect-methods/dev-status.svg)](https://david-dm.org/chrisinajar/collect-methods#info=devDependencies)
Collect a series of methods then run them.

## Installation

`npm install collect-methods`

## Usage

```js
var Collector = require('collect-methods');

var stop = Collector();

module.exports = {
  start: start,
  stop: stop,
  restart: restart
};

function start () {
  // init state object and stuff...
  stop(Delegator());
  stop(Router.watch(app.router));
  stop(SomeOtherInit);

  return stop;
}

function restart () {
  stop();
  start();
}
```

## Contributing

`npm run test`

# License
MIT
