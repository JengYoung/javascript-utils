import {filter, map, reduce} from './index.mjs';

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
