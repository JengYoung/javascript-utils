import {curry, pipe, take} from './base/index.mjs';
import {L} from './lazy/index.mjs';

export const takeAll = take(Infinity);

export const map = curry(pipe(L.map, takeAll));

export const filter = curry(pipe(L.filter, takeAll));

export const find = curry(pipe(L.filter, take(1), ([a]) => a));
