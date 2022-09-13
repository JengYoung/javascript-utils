import { describe, expect, it } from "vitest";
import readonly from './index'

describe('readonly shallow freeze', () => {
  it('사용자가 객체의 프로퍼티를 조작하면 바뀌지 않아야 한다.', () => {
    const obj = { a: 1, b: 2, c: { a: 3, b: 4 } };
    const readonlyObj = readonly(obj);
    expect(() => {
      readonlyObj.a = 10000
    }).toThrowError(/Cannot assign to read only property 'a' of object '#<Object>'/);
  })
})

describe('readonly deep freeze', () => {
  it('객체의 프로퍼티 내부가 객체여도, 프로퍼티 객체의 프로퍼티 값은 바뀌지 않아야 한다.', () => {
    const obj = { a: 1, b: 2, c: { a: 3, b: 4 } };
    const readonlyObj = readonly(obj);

    expect(() => {
      readonlyObj.c.a = 10000
    }).toThrowError(/Cannot assign to read only property 'a' of object '#<Object>'/);
  })

  it('객체의 프로퍼티 내부가 배열이어도, 배열의 인덱스에 할당된 값은 바뀌지 않아야 한다.', () => {
    const obj = { a: 1, b: 2, c: { a: 3, b: 4 }, d: [1,2,3,4] };
    const readonlyObj = readonly(obj);

    expect(() => {
      readonlyObj.d[1] = 10000
    }).toThrowError(/Cannot assign to read only property '1' of object '\[object Array\]'/);
  })
})