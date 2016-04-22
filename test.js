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
