const products = [
  {name: '반팔티', price: 15000},
  {name: '긴팔티', price: 20000},
  {name: '핸드폰케이스', price: 15000},
  {name: '후드티', price: 30000},
  {name: '바지', price: 25000},
];

(() => {
  /**
   * @description
   * 대개 평소에 하는 함수들. 문제점이 무엇일까?
   * 외부세상에 있는 값들을 내부에서 사용하는 것이 문제이다.
   * 이는 곧 순수하지 않기 때문에 부수효과를 일으킬 가능성이 높아진다.
   */
  function map() {
    const names = [];
    const prices = [];
    for (const p of products) {
      names.push(p.name);
      prices.push(p.price);
    }

    console.log(names);
    console.log(prices);
  }
  map();
})();

(() => {
  /**
   * @description
   * 어떤 인자를 받을지를 콜백함수에게 완전히 위임한다.
   * 보조함수를 통해 어떤 값을 받을 건지를 유연하게 설계한다.
   */

  function map(f, iter) {
    const res = [];

    for (const p of iter) {
      res.push(f(p));
    }

    return res;
  }

  /**
   * @description
   * map 함수는 Array에서는 사용하지만, 그 외의 곳에서는 사용하지 못함.
   * 대표적으로 NodeList.
   * 프로토타입에 map이 구현되어 있지 않음.
   *
   * 앞에서 만들었던 함수는 이러한 이터러블 프로토콜을 따른 객체의 순회를 가능케 함.
   * 이는 곧 특정 타입에 한정된 메서드보다 다형성을 가졌다고 할 수 있음.
   */

  function* gen() {
    yield 2;
    yield 3;
    yield 4;
  }

  console.log(map(a => a * a, gen()));

  /**
   * @description
   * Map 객체 역시 이터러블 프로토콜을 따른다.
   * 하지만 Map에는 map 프로토타입 메서드가 존재하지 않는다.
   * 그렇지만 map 함수를 통해 다형성을 바탕으로 원하는 결과를 처리할 수 있다.
   */
  const m = new Map();

  m.set('a', 10);
  m.set('b', 20);

  // const it = m[Symbol.iterator]();

  // console.log(it.next());
  // console.log(it.next());
  // console.log(it.next());

  console.log(new Map(map(([k, a]) => [k, a * 2], m)));
})();
