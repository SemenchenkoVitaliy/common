'use strict';

const tap = require('tap');
const common = require('..');

const array = [1, 2, 3, 4];
let iterator;

tap.beforeEach((done) => {
  iterator = new common.Iterator(array);
  done();
});

tap.test('Iterator is iterable', (test) => {
  let sum = 0;
  for (const value of iterator) {
    sum += value;
  }

  test.strictEqual(sum, 10);
  test.done();
});

tap.test('Iterator.forEach', (test) => {
  let sum = 0;
  iterator.forEach((value) => {
    sum += value;
  });

  test.strictEqual(sum, 10);
  test.done();
});

tap.test('Iterator.forEach', (test) => {
  let sum = 0;
  iterator.forEach((value) => {
    sum += value;
  });

  test.strictEqual(sum, 10);
  test.done();
});

tap.test('Iterator.reduce', (test) => {
  const sum = iterator.reduce((previous, current) => previous + current, 0);

  test.strictEqual(sum, 10);
  test.done();
});

tap.test('Iterator.map', (test) => {
  const sum = iterator
    .map(value => value * 2)
    .reduce((previous, current) => previous + current, 0);

  test.strictEqual(sum, 20);
  test.done();
});

tap.test('Iterator.filter', (test) => {
  const sum = iterator
    .filter(value => !(value % 2))
    .reduce((previous, current) => previous + current, 0);

  test.strictEqual(sum, 6);
  test.done();
});

tap.test('Iterator.each that must return true', (test) => {
  const result = iterator.each(element => element > 0);

  test.assert(result);
  test.done();
});

tap.test('Iterator.each that must return false', (test) => {
  const result = iterator.each(element => element % 2);

  test.assertNot(result);
  test.done();
});

tap.test('Iterator.some that must return true', (test) => {
  const result = iterator.some(element => element % 2);

  test.assert(result);
  test.done();
});

tap.test('Iterator.some that must return false', (test) => {
  const result = iterator.some(element => element < 0);

  test.assertNot(result);
  test.done();
});

tap.test('Iterator.find that must find an element', (test) => {
  const { found, value } = iterator.find(element => element % 2 === 0);

  test.assert(found);
  test.strictEqual(value, 2);
  test.done();
});

tap.test('Iterator.find that must not find an element', (test) => {
  const { found, value } = iterator.find(element => element > 4);

  test.assertNot(found);
  test.strictEqual(value, null);
  test.done();
});

tap.test('Iterator.includes that must return true', (test) => {
  const result = iterator.includes(1);

  test.assert(result);
  test.done();
});

tap.test('Iterator.includes that must return false', (test) => {
  const result = iterator.includes(0);

  test.assertNot(result);
  test.done();
});
