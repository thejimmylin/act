const lanes = {
  UPDATE: 1 << 1,
  INSERT: 1 << 2,
  REMOVE: 1 << 3,
  SVG: 1 << 4,
  DIRTY: 1 << 5,
  HEAD: 1 << 6,
  NOWORK: 1 << 7,
};

const isArray = Array.isArray;

const asArray = (v) => (!v ? [] : isArray(v) ? v : [v]);

const isFunction = (v) => typeof v === "function";

const isStringLike = (v) => typeof v === "string" || typeof v === "number";

export { lanes, isArray, asArray, isFunction, isStringLike };
