module.exports = Collector;

function Collector () {
  var fnQueue = [];
  var errors = [];

  return collectOrRun;

  function collectOrRun () {
    if (arguments.length === 0) {
      var result = fnQueue.map(run);
      fnQueue = [];
      if (errors.length) {
        throw errors;
      }
      return result;
    }
    var args = Array.prototype.slice.call(arguments);

    fnQueue = fnQueue.concat(args);
  }

  function run (fn) {
    try {
      return fn();
    } catch (e) {
      errors.push(e);
      return e;
    }
  }
}
