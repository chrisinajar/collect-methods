module.exports = Collector;

function Collector () {
  var fnQueue = [];
  var errors = [];

  return collectOrRun;

  function collectOrRun () {
    if (arguments.length === 0) {
      var result = fnQueue.slice()
        .filter(function (entry) {
          return !entry.deleted;
        });
      fnQueue = [];

      result = result.map(run);
      if (errors.length) {
        throw errors;
      }
      return result;
    }
    var args = Array.prototype.slice.call(arguments);

    fnQueue = fnQueue.concat(args.map(FnEntry));
    return removeFromQueue;

    function removeFromQueue () {
      return args.map(function (fn) {
        for (var i = 0; i < fnQueue.length; i++) {
          if (fnQueue[i].fn === fn) {
            fnQueue[i].deleted = true;
            fnQueue.splice(i, 1);
            break;
          }
        }
      });
    }
  }

  function run (fn) {
    try {
      return fn.fn();
    } catch (e) {
      errors.push(e);
      return e;
    }
  }

  function FnEntry (fn) {
    if (!(this instanceof FnEntry)) {
      return new FnEntry(fn);
    }
    this.fn = fn;
    this.deleted = false;

    return this;
  }
}
