export function curry(f) {
  return (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));
}

/**
 * NOTE: curry를 통해 인자 하나를 받더라도 나머지 인자를 받기 위해 기다리는 함수로 바꾼다.
 */
export const map = curry((f, iter) => {
  const res = [];

  for (const p of iter) {
    res.push(f(p));
  }

  return res;
});

export const filter = curry((f, iter) => {
  const res = [];
  for (const a of iter) {
    if (f(a)) {
      res.push(a);
    }
  }

  return res;
});

export const reduce = curry((f, acc, iter) => {
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
});

export function go(...args) {
  return reduce((a, f) => f(a), args);
}

export function pipe(f, ...fs) {
  return (...as) => go(f(...as), ...fs);
}
