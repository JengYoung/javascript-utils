export const L = {};

L.range = function* range(length) {
  let i = 0;

  while (i < length) {
    yield i;
    i += 1;
  }
};

L.map = function* map(f, iter) {
  for (const a of iter) yield f(a);
};

L.filter = function* filter(f, iter) {
  for (const a of iter) {
    if (f(a)) {
      yield a;
    }
  }
};
