/**
 * 함수를 받아서 함수를 리턴한다.
 * 함수에서 사용할 인자들을 받는다.
 * 만약 2개 이상 전달되었다는 것은 length가 있음 -> length가 있다면 받아둔 함수를 즉시실행. 아니면 함수를 리턴.
 */
(() => {
  const curry =
    f =>
    (a, ..._) =>
      _.length ? f(a, ..._) : (...__) => f(a, ...__);

  const mult = curry((a, b, c) => a * b * c);
  console.log(mult(1)(2, 3));
})();
