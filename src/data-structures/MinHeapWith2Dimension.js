export class MinHeap {
  constructor() {
    this.arr = [null];
  }

  heappush(val) {
    this.arr.push(val);
    let nowIndex = this.arr.length - 1;
    let parentIndex = this.getParentIndex(nowIndex);

    while (nowIndex > 1 && this.arr[nowIndex][0] < this.arr[parentIndex][0]) {
      this.swap(nowIndex, parentIndex);
      nowIndex = parentIndex;
      parentIndex = this.getParentIndex(nowIndex);
    }
  }

  heappop() {
    if (this.arr.length === 1) return null;
    if (this.arr.length === 2) return this.arr.pop();

    const min = this.arr[1];
    this.arr[1] = this.arr.pop();

    let [nowIndex, leftIndex, rightIndex] = this.getUpdatedindices(1);

    if (leftIndex > this.arr.length - 1) {
      return min;
    }
    if (
      rightIndex > this.arr.length - 1 &&
      this.arr[leftIndex][0] < this.arr[nowIndex][0]
    ) {
      this.swap(nowIndex, leftIndex);
      return min;
    }
    while (
      leftIndex < this.arr.length - 1 &&
      rightIndex < this.arr.length &&
      (this.arr[leftIndex][0] < this.arr[nowIndex][0] ||
        this.arr[nowIndex][0] < this.arr[leftIndex][0])
    ) {
      const minIndex =
        this.arr[rightIndex][0] < this.arr[leftIndex][0]
          ? rightIndex
          : leftIndex;
      this.swap(minIndex, nowIndex);
      [nowIndex, leftIndex, rightIndex] = this.getUpdatedindices(minIndex);
    }

    return min;
  }

  getParentIndex(index) {
    return Math.floor(index / 2);
  }

  getUpdatedindices(index) {
    return [index, index * 2, index * 2 + 1];
  }

  swap(a, b) {
    [this.arr[a], this.arr[b]] = [this.arr[b], this.arr[a]];
  }

  get length() {
    return this.arr.length - 1;
  }
}
