const dijkstra = (graph, n, start) => {
  const distance = new Array(n).fill(Infinity);

  for (let i = 0; i < n; i += 1) {}
};

const arr = [
  [3, 5, 78],
  [2, 1, 1],
  [1, 3, 0],
  [4, 3, 59],
  [5, 3, 85],
  [5, 2, 22],
  [2, 4, 23],
  [1, 4, 43],
  [4, 5, 75],
  [5, 1, 15],
  [1, 5, 91],
  [4, 1, 16],
  [3, 2, 98],
  [3, 4, 22],
  [5, 4, 31],
  [1, 2, 0],
  [2, 5, 4],
  [4, 2, 51],
  [3, 1, 36],
  [2, 3, 59],
];

const n = 5;

const graph = Array.from({length: n + 1}, () => []);
arr.forEach(([from, to, cost]) => {
  graph[from].push([cost, to]);
});
