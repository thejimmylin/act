const LANE = {
  UPDATE: 2 ** 0,
  INSERT: 2 ** 1,
  REMOVE: 2 ** 2,
  SVG: 2 ** 3,
  DIRTY: 2 ** 4,
  HEAD: 2 ** 5,
  NOWORK: 2 ** 6,
};

const isArray = Array.isArray;

const asArray = (v) => (!v ? [] : isArray(v) ? v : [v]);

const isFunction = (v) => typeof v === "function";

const isStringLike = (v) => typeof v === "string" || typeof v === "number";

export { LANE, isArray, asArray, isFunction, isStringLike };
