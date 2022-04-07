const asArray = (value) => {
  if (!value) {
    return [];
  } else if (Array.isArray(value)) {
    return value;
  } else {
    return [value];
  }
};

const isFunction = (value) => typeof value === "function";

const isStringLike = (value) => {
  return typeof value === "string" || typeof value === "number";
};

export { asArray, isFunction, isStringLike };
