import {pipe, join} from './base/index.mjs';
import {L} from './lazy/index.mjs';

const queryStr = pipe(
  L.entries,
  L.map(([k, v]) => `${k}=${v}`),
  join('&'),
);

console.log(queryStr({limit: 10, offset: 10, type: 'notice'}));
