/**
 * @description
 * reduce 함수가 없다면 다음과 같이 처리할 것이다.
 */
(() => {
  const nums = [1, 2, 3, 4, 5];

  let total = 0;

  for (const n of nums) {
    total += n;
  }

  console.log(total);
})();

/**
 * @description
 * reduce는 특정 값으로 축약해나가는 함수이다.
 */
(() => {
  const reduce = (f, acc, iter) => {
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
  };

  const add = (a, b) => a + b;

  console.log(reduce(add, 0, [1, 2, 3, 4, 5]));
  console.log(add(add(add(add(add(0, 1), 2), 3), 4), 5));
})();
