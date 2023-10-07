export function map(f) {
  return function* gen(iter) {
    for (const a of iter) {
      yield f(a);
    }
  };
}

console.log(map(i => i + 1)([1, 2, 3, 4, 5]));
