var test = require('tape');
var Collector = require('./');

test(function (t) {
  t.ok(Collector);
  t.ok(Collector());
  t.end();
});

test('runs 1 method once', function (t) {
  t.plan(1);
  var collect = Collector();

  collect(function () {
    t.ok(true, 'runs method');
  });
  collect();
  collect();
});

test('runs many methods', function (t) {
  t.plan(6);
  var collect = Collector();

  collect(function () {
    t.ok(true, 'runs method');
  });
  collect();
  collect();

  collect(function () {
    t.ok(true, 'runs method');
  }, function () {
    t.ok(true, 'runs method');
  });
  collect();
  collect();

  collect(function () {
    t.ok(true, 'runs method');
  });
  collect(function () {
    t.ok(true, 'runs method');
  }, function () {
    t.ok(true, 'runs method');
  });
  collect();
  collect();
});

test('error handling', function (t) {
  t.plan(2);

  var collect = Collector();
  collect(function () {
    throw new Error();
  });
  collect(function () {
    t.ok(true, 'still runs all functions');
  });

  t.throws(collect, 'throws errors');
});

test('can cancel queued methods', function (t) {
  t.plan(3);
  var collect = Collector();

  collect(t.pass);
  var handler = collect(t.fail);
  collect(t.pass);

  t.doesNotThrow(handler);
  collect();
  collect();
});

test('can queue from within handler', function (t) {
  t.plan(2);
  var collect = Collector();

  collect(t.pass);
  collect(function () {
    collect(t.pass);
  });
  collect();
  collect();
});
