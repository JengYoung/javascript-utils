import {describe, expect, it} from 'vitest';
import {MinHeap} from './MinHeapWith2Dimension';

describe('MinHeap', () => {
  it('일련의 여러 숫자값를 넣었을 때 순서대로 작은 숫자값이 나와야 한다.', () => {
    const minHeap = new MinHeap();

    minHeap.heappush([1, 2]);
    minHeap.heappush([17, 1]);
    minHeap.heappush([6, 153]);
    minHeap.heappush([32, 5]);
    minHeap.heappush([3, 10]);

    console.log(minHeap.arr);
    expect(minHeap.heappop()[0]).toEqual(1);
    console.log(minHeap.arr);
    expect(minHeap.heappop()[0]).toEqual(3);
    console.log(minHeap.arr);
    expect(minHeap.heappop()[0]).toEqual(6);
    console.log(minHeap.arr);
    expect(minHeap.heappop()[0]).toEqual(17);
    console.log(minHeap.arr);
    expect(minHeap.heappop()[0]).toEqual(32);
  });

  it('만약 1개의 값이 있었다면 1개가 힙에서 빠지면 0개가 남아야 한다.', () => {
    const minHeap = new MinHeap();
    minHeap.heappush([1, 2]);
    expect(minHeap.heappop()[0]).toEqual(1);
    expect(minHeap.length).toEqual(0);
  });

  it('만약 더이상 heap에 아무 값도 없었다면 null이 나와야 한다.', () => {
    const minHeap = new MinHeap();
    expect(minHeap.heappop()).toEqual(null);
  });
});
