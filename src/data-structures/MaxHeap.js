export class MaxHeap {
  constructor() {
    this.arr = [null];
  }

  heappush(value) {
    this.arr.push(value);

    let nowIdx = this.arr.length - 1;
    let parentIdx = Math.floor(nowIdx / 2);

    while (nowIdx > 1 && this.arr[nowIdx] > this.arr[parentIdx]) {
      this.swap(nowIdx, parentIdx);

      nowIdx = parentIdx;
      parentIdx = Math.floor(parentIdx / 2);
    }
  }

  heappop() {
    if (this.length === 0) return null;
    if (this.length === 1) return this.arr.pop();

    const returnValue = this.arr[1];

    this.arr[1] = this.arr.pop();

    let nowIdx = 1;
    let leftIdx = nowIdx * 2;
    let rightIdx = nowIdx * 2 + 1;

    if (this.arr[leftIdx] === undefined) {
      return returnValue;
    }

    if (this.arr[rightIdx] === undefined) {
      if (this.arr[leftIdx] > this.arr[nowIdx]) {
        this.swap(leftIdx, nowIdx);

        return returnValue;
      }
    }

    while (
      this.arr[nowIdx] < this.arr[rightIdx] ||
      this.arr[nowIdx] < this.arr[leftIdx]
    ) {
      if (this.arr[leftIdx] <= this.arr[rightIdx]) {
        this.swap(nowIdx, rightIdx);
        nowIdx = rightIdx;
      } else {
        this.swap(nowIdx, leftIdx);
        nowIdx = leftIdx;
      }

      leftIdx = nowIdx * 2;
      rightIdx = nowIdx * 2 + 1;
    }

    return returnValue;
  }

  swap(a, b) {
    [this.arr[a], this.arr[b]] = [this.arr[b], this.arr[a]];
  }

  get length() {
    return this.arr.length - 1;
  }
}
