export const binarySearch = (arr, start, end, target) => {
  let s = start;
  let e = end;

  let mid = Math.floor((e + s) / 2);

  while (s <= e) {
    const now = arr[mid];

    if (now === target) {
      return mid;
    }

    if (now < target) {
      s = mid + 1;
    }

    if (now > target) {
      e = mid - 1;
    }

    mid = Math.floor((e + s) / 2);
  }

  return -1; // 결과가 나지 않는 경우.
};
