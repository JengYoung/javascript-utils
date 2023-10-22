import {curry, pipe, range} from '../base/index.mjs';
import {map} from '../index.mjs';
import {L} from './index.mjs';

L.flatMap = curry(pipe(L.map, L.flatten));

const it = L.flatMap(
  range,
  map(a => a + 1, [1, 2, 3]),
);

console.log([...it]);
