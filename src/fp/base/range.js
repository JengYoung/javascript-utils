import {reduce} from './index.mjs';

const range = (to, from = 0, res = []) => {
  if (to <= from) {
    return res;
  }

  return range(to, from + 1, [...res, from]);
};

const add = (a, b) => a + b;

const list = range(4);
console.log(reduce(add, list));
