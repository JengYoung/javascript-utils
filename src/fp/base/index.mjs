export function curry(f) {
  return (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));
}

/**
 * NOTE: curry를 통해 인자 하나를 받더라도 나머지 인자를 받기 위해 기다리는 함수로 바꾼다.
 */
export const map = curry((f, iter) => {
  const res = [];

  iter = iter[Symbol.iterator]();

  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(f(a));
  }

  return res;
});

export const filter = curry((f, iter) => {
  const res = [];
  iter = iter[Symbol.iterator]();

  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) {
      res.push(a);
    }
  }

  return res;
});

export const take = curry((l, iter) => {
  const res = [];

  iter = iter[Symbol.iterator]();

  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;

    res.push(a);

    if (res.length === l) return res;
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

export const range = (to, from = 0, res = []) => {
  if (to <= from) {
    return res;
  }

  return range(to, from + 1, [...res, from]);
};
