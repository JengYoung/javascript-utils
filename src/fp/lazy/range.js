import {reduce} from '../base/index.mjs';

/** \
 * @description
 * 순회를 할 때에만 평가하도록 함.
 */
const L = {};

L.range = function* lazyRange(length) {
  let i = 0;

  while (i < length) {
    yield i;
    i += 1;
  }
};

const add = (a, b) => a + b;
const list = L.range(4);

console.log(list);
console.log(reduce(add, list));
