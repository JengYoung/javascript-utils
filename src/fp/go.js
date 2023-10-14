import {filter, map, reduce} from './index.mjs';

/**
 * 함수형 프로그래밍에서는 코드들 값으로 다룬다.
 * 코드들을 값으로 다루는 함수들을 만들어 가독성을 높인다.
 */

/**
 * @description
 * 기존 문제점
 * - 함수가 중첩되어 있다.
 */
(() => {
  const products = [
    {name: '반팔티', price: 15000},
    {name: '긴팔티', price: 20000},
    {name: '핸드폰케이스', price: 15000},
    {name: '후드티', price: 30000},
    {name: '바지', price: 25000},
  ];

  const add = (a, b) => a + b;

  /**
   * 합성 방식은 오른쪽에서 왼쪽으로 진행된다.
   * 그리고 항상 값이 어떤 게 나와야 할지를 생각하면서 함수형 프로그래밍을 진행해야 한다.
   */
  console.log(
    reduce(
      add,
      filter(
        n => n >= 20000,
        map(p => p.price, products),
      ),
    ),
  );
})();

/**
 * @description
 * go 함수는 첫 값을 토대로 다음 함수들을 차례로 연산한 결과의 값을 반환한다.
 * 이는 reduce를 통해 손쉽게 달성 가능하다.
 * 일련의 함수를 특정 값으로 순서대로 나타낸다는 점이 reduce의 값을 축소한다는 목표와 동일하기 때문이다.
 */
(() => {
  const go = (...args) => reduce((a, f) => f(a), args);

  go(
    0,
    a => a + 1,
    a => a + 10,
    a => a + 100,
    console.log,
  );
})();
