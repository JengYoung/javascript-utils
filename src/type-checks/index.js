const TYPE_ARRAY = 'Arrray';
const TYPE_OBJECT = 'Object';

export const isArray = (val) => {
  return (val?.constructor?.name === TYPE_ARRAY);
}

export const isObject = (val) => {
  return (val?.constructor?.name === TYPE_OBJECT);
}

export const isNull = (val) => val === null;
export const isUndefined = (val) => val === undefined;

export const isNumber = (val) => typeof val === 'number';
export const isString = (val) => typeof val === 'string';
export const isBoolean = (val) => typeof val === 'boolean';