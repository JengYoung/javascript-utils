const products = [
  {name: '반팔티', price: 15000},
  {name: '긴팔티', price: 20000},
  {name: '핸드폰케이스', price: 15000},
  {name: '후드티', price: 30000},
  {name: '바지', price: 25000},
];

/**
 * @description
 * filter 메서드는 특정 원하는 값만 걸러내는 메서드.
 * map이랑 거의 로직은 비슷하다.
 */
(() => {
  const filter = (f, iter) => {
    const res = [];
    for (const a of iter) {
      if (f(a)) {
        res.push(a);
      }
    }

    return res;
  };

  console.log(filter(p => p.price < 20000, products));
  console.log(filter(p => p.price >= 20000, products));
})();
