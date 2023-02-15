import {describe, expect, it} from 'vitest';
import {binarySearch} from './binarySearch';

describe('BinarySearch', () => {
  it('1,2,3이 있다면 1이 반환되어야 한다.', () => {
    const arr = [1, 2, 3];
    expect(binarySearch(arr, 0, arr.length - 1, 2)).toEqual(1);
  });

  it('만약 해당되는 값이 배열 내에 없다면 -1을 반환해야 한다.', () => {
    const arr = [1, 2, 3, 5];
    expect(binarySearch(arr, 0, arr.length - 1, 4)).toEqual(-1);
  });
});
