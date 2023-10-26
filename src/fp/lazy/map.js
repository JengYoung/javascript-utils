const L = {};

/**
 * LAZY 지연시킨다.
 * L.map()
 */

(() => {
  L.map = function* (f, iter) {
    for (const a of iter) yield f(a);
  };

  const it = L.map(a => a + 10, [1, 2, 3]);
  console.log([...it]);
})();

go(
  [1, 2, 3, 4, 5],
  L.map(v => v * 2),
  L.filter(v => v % 2),
  take(2),
);
