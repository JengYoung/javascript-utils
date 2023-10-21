export const L = {};

L.range = function* range(length) {
  let i = 0;

  while (i < length) {
    yield i;
    i += 1;
  }
};

L.map = function* map(f, iter) {
  iter = iter[Symbol.iterator]();

  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;

    yield f(a);
  }
};

L.filter = function* filter(f, iter) {
  iter = iter[Symbol.iterator]();

  let cur;

  while (!(cur = iter.next()).done) {
    const a = cur.value;

    yield f(a);
  }
};
