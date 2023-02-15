import {describe, expect, it} from 'vitest';
import {MaxHeap} from './MaxHeap';

describe('maxHeap', () => {
  it('일련의 여러 숫자값를 넣었을 때 순서대로 큰 숫자값이 나와야 한다.', () => {
    const maxHeap = new MaxHeap();

    maxHeap.heappush(1);
    maxHeap.heappush(17);
    maxHeap.heappush(6);
    maxHeap.heappush(32);
    maxHeap.heappush(3);

    expect(maxHeap.heappop()).toEqual(32);
    expect(maxHeap.heappop()).toEqual(17);
    expect(maxHeap.heappop()).toEqual(6);
    expect(maxHeap.heappop()).toEqual(3);
    expect(maxHeap.heappop()).toEqual(1);
  });

  it('만약 1개의 값이 있었다면 1개가 힙에서 빠지면 0개가 남아야 한다.', () => {
    const maxHeap = new MaxHeap();
    maxHeap.heappush(1);
    expect(maxHeap.heappop()).toEqual(1);
    expect(maxHeap.length).toEqual(0);
  });

  it('만약 더이상 heap에 아무 값도 없었다면 null이 나와야 한다.', () => {
    const maxHeap = new MaxHeap();
    expect(maxHeap.heappop()).toEqual(null);
  });
});
