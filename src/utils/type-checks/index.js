const TYPE_ARRAY = 'Arrray';
const TYPE_OBJECT = 'Object';
const TYPE_SET = 'Set';
const TYPE_MAP = 'Map';

export const isArray = val => val?.constructor?.name === TYPE_ARRAY;
export const isShallowObject = val =>
  typeof val === 'object' && val !== null && val !== undefined && !isArray(val);

export const isObject = val => val?.constructor?.name === TYPE_OBJECT;
export const isSet = val => val?.constructor?.name === TYPE_SET;
export const isMap = val => val?.constructor?.name === TYPE_MAP;

export const isNull = val => val === null;
export const isUndefined = val => val === undefined;

export const isNumber = val => typeof val === 'number';
export const isString = val => typeof val === 'string';
export const isBoolean = val => typeof val === 'boolean';
