const L = {};

L.filter = function* filter(f, iter) {
  for (const a of iter) {
    if (f(a)) {
      yield a;
    }
  }
};

const it = L.filter(a => a % 2, [1, 2, 3, 4]);
console.log(it.next());
console.log(it.next());
console.log(it.next());
