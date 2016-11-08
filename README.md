# collect-methods [![Build Status](https://travis-ci.org/chrisinajar/collect-methods.svg?branch=master)](https://travis-ci.org/chrisinajar/collect-methods) [![devDependency Status](https://david-dm.org/chrisinajar/collect-methods/dev-status.svg)](https://david-dm.org/chrisinajar/collect-methods#info=devDependencies)
Collect a series of methods then run them. Kind of like an event emitter where everything is once.

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

## API

#### `CollectMethods()` -> `collector`
Create a new method collector instance.

#### `collector(method)` -> `removeListener`
Add a new **method** to the collector. Returns a **removeListener** function. When executed, **removeListener** returns an array of the methods removed from the queue.

##### method

*Required*  
Type: `function`  

The handler to execute when the collector is run

#### `collector()`
Executes all of the methods in the queue and clears it. Subsequent calls will do nothing until new handlers are added.

## Contributing

`npm run test`

# License
MIT
