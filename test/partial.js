'use strict';

api.metatests.test('partial ', (test) => {
  const func = (a, b, c, d) => (a + b + c + d);
  const fn1 = api.common.partial(func);
  const fn2 = api.common.partial(func, 10);
  const fn3 = api.common.partial(func, 10, 20);
  const fn4 = api.common.partial(func, 10, 20, 30);
  const fn5 = api.common.partial(func, 10, 20, 30, 40);
  const result1 = fn1(10, 20, 30, 40);
  const result2 = fn2(20, 30, 40);
  const result3 = fn3(30, 40);
  const result4 = fn4(40);
  const result5 = fn5();
  test.strictSame(result1, 100);
  test.strictSame(result2, 100);
  test.strictSame(result3, 100);
  test.strictSame(result4, 100);
  test.strictSame(result5, 100);
  test.end();
});
