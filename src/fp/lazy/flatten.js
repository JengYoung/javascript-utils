import {pipe} from '../base/index.mjs';
import {takeAll} from '../index.mjs';

const L = {};

const isIterable = a => a && a[Symbol.iterator];
L.flatten = function* flatten(iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      for (const b of a) {
        yield b;
      }
    } else {
      yield a;
    }
  }
};

console.log([...L.flatten([[1, 2], 3, 4, [5, 6]])]);

const flatten = pipe(L.flatten, takeAll);

console.log(flatten([[1, 2], 3, 4, [5, 6]]));
