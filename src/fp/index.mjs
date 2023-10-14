export function map(f, iter) {
  const res = [];

  for (const p of iter) {
    res.push(f(p));
  }

  return res;
}

export function filter(f, iter) {
  const res = [];
  for (const a of iter) {
    if (f(a)) {
      res.push(a);
    }
  }

  return res;
}

export function reduce(f, acc, iter) {
  /**
   * 초기값(acc)가 없는 경우 직접 만들어줌.
   */
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(acc, a);
  }

  return acc;
}

export function go(...args) {
  return reduce((a, f) => f(a), args);
}

export function pipe(f, ...fs) {
  return (...as) => go(f(...as), ...fs);
}
