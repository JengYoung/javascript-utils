import {describe, expect, it} from 'vitest';
import {MinHeap} from './MinHeap';

describe('MinHeap', () => {
  it('일련의 여러 숫자값를 넣었을 때 순서대로 작은 숫자값이 나와야 한다.', () => {
    const minHeap = new MinHeap();

    minHeap.heappush(1);
    minHeap.heappush(17);
    minHeap.heappush(6);
    minHeap.heappush(32);
    minHeap.heappush(3);

    expect(minHeap.heappop()).toEqual(1);
    expect(minHeap.heappop()).toEqual(3);
    expect(minHeap.heappop()).toEqual(6);
    expect(minHeap.heappop()).toEqual(17);
    expect(minHeap.heappop()).toEqual(32);
  });

  it('만약 더이상 heap에 아무 값도 없었다면 null이 나와야 한다.', () => {
    const minHeap = new MinHeap();
    expect(minHeap.heappop()).toEqual(null);
  });
});
