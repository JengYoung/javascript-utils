/* eslint-disable no-plusplus */

import {describe, expect, it} from 'vitest';

describe('연산자를 통해 연산하면', () => {
  it('+는 더하기를 수행하므로 1 + 2는 3이 나와야 한다.', () => {
    expect(1 + 2).toEqual(3);
  });

  it('-는 빼기를 수행하므로 5 - 2는 3이 나와야 한다.', () => {
    expect(5 - 2).toEqual(3);
  });

  it('*는 곱하기를 수행하므로 5 * 2는 10이 나와야 한다.', () => {
    expect(5 * 2).toEqual(10);
  });

  it('/는 나누기를 수행하므로 5 / 2는 2.5가 나와야 한다.', () => {
    expect(5 / 2).toEqual(2.5);
  });

  it('%는 나머지를 수행하므로 5 % 2는 1이 나와야 한다.', () => {
    expect(5 - 2).toEqual(3);
  });

  it('0으로 나누기를 수행하면 결과 값은 Infinity으로 나온다', () => {
    expect(5 / 0).toEqual(Infinity);
  });
});

describe.concurrent('단항 연산자를 통해 연산하면', () => {
  it('++x, --x는 먼저 피연산자의 연산을 수행한 후 연산을 수행해야 한다.', () => {
    let x = 5;
    let y = 10;

    let result = ++x * ++y;
    expect(result).toEqual(66); // ( 5 + 1 ) * ( 10 + 1 )

    result = ++x * y;
    expect(result).toEqual(77); // ( 6 + 1 ) * 11

    result = --x * --y;
    expect(result).toEqual(60); // ( 7 - 1 ) * (11 - 1)
  });

  it('x++는 먼저 피연산자의 연산을 수행한 후 연산을 수행해야 한다.', () => {
    let x = 3;
    let y = 4;

    const result = x++ * y++;
    expect(result).toEqual(12);
    expect(x).toEqual(4);
    expect(y).toEqual(5);
  });

  it('위와 같은 산술 연산자는 기존 변수의 저장된 값까지 연산을 수행하고 업데이트하여 계산해야 한다.', () => {
    let x = 1;

    const z = ++x * x++;

    expect(z).toEqual(4);
    expect(x).toEqual(3);
  });

  it('+는 문자열을 넘버 타입으로 변환시켜야 한다.', () => {
    let x: number | string = '1';
    x = +x;

    let y: number | string = '5';
    y = -y;

    expect(x).toEqual(1);
    expect(y).toEqual(-5);
  });
});

describe('문자열 연결 연산자는', () => {
  it('하나라도 문자열이 있다면, 문자 타입으로 해석되어야 한다.', () => {
    const x = 1;
    const y = '2';
    expect(x + y).toBeTypeOf('string');
  });

  it('문자열이 없다면, 넘버 타입으로 해석되어야 한다.', () => {
    const x = 1;
    const y = 2;
    expect(x + y).toBeTypeOf('number');
  });
});

describe('ES12_Logical Assignment Operators', () => {
  it('a &&= b to be equal a && (a = b)', () => {
    let a = 0;
    a &&= 2;
    expect(a).not.toEqual(2); // a는 falsy한 값이 아니어야 새로운 값을 할당 받을 수 있다.

    a = 1;
    a &&= 2;
    expect(a).toEqual(2);
  });

  it('a ||= b to be equal a || (a = b)', () => {
    let a = 0;
    a ||= 2;
    expect(a).toEqual(2); // a가 falsy한 값이면 오른쪽 값을 할당 받는다.

    a = 1;
    a ||= 4;
    expect(a).toEqual(1); // a가 falsy한 값이 아니라면 할당받지 않는다.
  });

  it('a ??= b to be equal a ?? (a = b)', () => {
    let a: undefined | number = 2;
    a ??= 3;

    expect(a).toEqual(2); // a가 undefined나 null이 아니라면 할당받지 않는다.

    a = undefined;
    a ??= 3;
    expect(a).toEqual(3); // a가 undefined나 null이라면 오른쪽 값을 할당 받는다.
  });
});

describe.concurrent('단항 연산자를 통해 연산하면', () => {
  it('++x, --x는 먼저 피연산자의 연산을 수행한 후 연산을 수행해야 한다.', () => {
    let x = 5;
    let y = 10;

    let result = ++x * ++y;
    expect(result).toEqual(66); // ( 5 + 1 ) * ( 10 + 1 )

    result = ++x * y;
    expect(result).toEqual(77); // ( 6 + 1 ) * 11

    result = --x * --y;
    expect(result).toEqual(60); // ( 7 - 1 ) * (11 - 1)
  });

  it('x++는 먼저 피연산자의 연산을 수행한 후 연산을 수행해야 한다.', () => {
    let x = 3;
    let y = 4;

    const result = x++ * y++;
    expect(result).toEqual(12);
    expect(x).toEqual(4);
    expect(y).toEqual(5);
  });

  it('위와 같은 산술 연산자는 기존 변수의 저장된 값까지 연산을 수행하고 업데이트하여 계산해야 한다.', () => {
    let x = 1;

    const z = ++x * x++;

    expect(z).toEqual(4);
    expect(x).toEqual(3);
  });

  it('+는 문자열을 넘버 타입으로 변환시켜야 한다.', () => {
    let x: number | string = '1';
    x = +x;

    let y: number | string = '5';
    y = -y;

    expect(x).toEqual(1);
    expect(y).toEqual(-5);
  });
});

describe('ES12_Logical Assignment Operators', () => {
  it('a &&= b to be equal a && (a = b)', () => {
    let a = 0;
    a &&= 2;
    expect(a).not.toEqual(2); // a는 falsy한 값이 아니어야 새로운 값을 할당 받을 수 있다.

    a = 1;
    a &&= 2;
    expect(a).toEqual(2);
  });

  it('a ||= b to be equal a || (a = b)', () => {
    let a = 0;
    a ||= 2;
    expect(a).toEqual(2); // a가 falsy한 값이면 오른쪽 값을 할당 받는다.

    a = 1;
    a ||= 4;
    expect(a).toEqual(1); // a가 falsy한 값이 아니라면 할당받지 않는다.
  });

  it('a ??= b to be equal a ?? (a = b)', () => {
    let a: undefined | number = 2;
    a ??= 3;

    expect(a).toEqual(2); // a가 undefined나 null이 아니라면 할당받지 않는다.

    a = undefined;
    a ??= 3;
    expect(a).toEqual(3); // a가 undefined나 null이라면 오른쪽 값을 할당 받는다.
  });
});

describe('비교 연산자는', () => {
  // it("===는 타입과 관계 없이 값을 느슨하게 검사해야 한다.", () => {
  //   const x = 1;
  //   const y = true;

  //   expect(x === y).toEqual(false);
  // });

  // it("==는 타입과 관계 없이 값을 느슨하게 검사해야 한다.", () => {
  //   const x = 1;
  //   const y = true;

  //   expect(x == y).toEqual(true);
  // });

  it('객체 타입의 값의 비교는 항상 다르게 나와야 한다', () => {
    const a = [1, 2, 3];
    const b = [1, 2, 3];

    /**
     * 이는 같지 않아요. 왜냐! 배열은 객체타입이죠?
     * 객체 타입은 주소 값을 통해 값을 불러오죠!
     * 그런데 두 배열의 주소 값이 같지 않겠죠? 따라서 false입니다!
     */
    /* eslint-disable-next-line eqeqeq */
    expect(a == b).not.toEqual(true);
    expect(a === b).not.toEqual(true);
  });
});

// describe("삼항 연산자", () => {
//   it("만약 조건이 truthy하다면 좌항을 실시해야 한다.", () => {
//     let check = 1 === 1;
//     let result = !!check;
//     expect(result).toBeTruthy();

//     check = 1 !== 1;
//     result = !!check;
//     expect(result).toBeFalsy();
//   });
// });

describe('typeof', () => {
  it('개발 당시 실수로 인해 null은 타입 검사 시 object로 나와야 한다.', () => {
    expect(null).toBeTypeOf('object');
  });
});
