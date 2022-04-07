const lanes = {
  UPDATE: 1 << 1,
  INSERT: 1 << 2,
  REMOVE: 1 << 3,
  SVG: 1 << 4,
  DIRTY: 1 << 5,
  HEAD: 1 << 6,
  NOWORK: 1 << 7,
};

const asArray = (value) => {
  if (!value) {
    return [];
  } else if (Array.isArray(value)) {
    return value;
  } else {
    return [value];
  }
};

const isFunction = (value) => {
  return typeof value === "function";
};

const isStringLike = (value) => {
  return typeof value === "string" || typeof value === "number";
};

export { lanes, asArray, isFunction, isStringLike };
