import {curry} from '../base/index.mjs';

const range = curry(function* range(length) {
  let i = 0;

  while (i < length) {
    yield i;
    i += 1;
  }
});

const map = curry(function* map(f, iter) {
  iter = iter[Symbol.iterator]();

  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;

    yield f(a);
  }
});

const filter = curry(function* filter(f, iter) {
  iter = iter[Symbol.iterator]();

  let cur;

  while (!(cur = iter.next()).done) {
    const a = cur.value;

    yield f(a);
  }
});

const entries = function* entries(obj) {
  for (const k in obj) {
    const value = [k, obj[k]];

    yield value;
  }
};

export const L = {
  range,
  map,
  filter,
  entries,
};
