import {reduce} from './index.mjs';

/**
 * @description
 * pipe는 함수를 리턴하는 함수.
 *
 * go 함수의 경우 즉시 함수들과 인자를 전달해서 즉시 값을 평가하는 데 사용한다면
 * pipe는 함수들이 나열된 합성된 함수를 제작하는 데 사용한다.
 */
(() => {
  const go = (...args) => reduce((a, f) => f(a), args);

  /**
   * 인자를 2개를 받는 함수도 사용할 수 있도록 한다.
   */
  const pipe =
    (f, ...fs) =>
    (...as) =>
      go(f(...as), ...fs);

  const f = pipe(
    (a, b) => a + b,
    a => a + 10,
    a => a + 100,
  );

  console.log(f(0, 10));
})();
