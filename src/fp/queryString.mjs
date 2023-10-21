import {map, reduce, pipe} from './base/index.mjs';

const queryStr = pipe(
  Object.entries,
  map(([k, v]) => `${k}=${v}`),
  reduce((a, b) => `${a}&${b}`),
);

console.log(queryStr({limit: 10, offset: 10, type: 'notice'}));
