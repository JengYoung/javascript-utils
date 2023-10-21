const range = (to, from = 0, res = []) => {
  if (to <= from) {
    return res;
  }

  return range(to, from + 1, [...res, from]);
};

const take = (l, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(a);

    if (res.length === l) return res;
  }

  return res;
};

console.log(take(5, range(100)));
