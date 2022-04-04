import { isStringLike, isArray, asArray } from "./utils";

const h = (type, props, ...kids) => {
  props = props || {};
  kids = flat(asArray(props.children || kids));
  if (kids.length) props.children = kids.length === 1 ? kids[0] : kids;
  const key = props.key || null;
  const ref = props.ref || null;
  if (key) props.key = undefined;
  if (ref) props.ref = undefined;
  return createVnode(type, props, key, ref);
};

const some = (x) => x != null && x !== true && x !== false;

const flat = (arr, target = []) => {
  arr.forEach((v) => {
    isArray(v)
      ? flat(v, target)
      : some(v) && target.push(isStringLike(v) ? createText(v) : v);
  });
  return target;
};

const createVnode = (type, props, key, ref) => ({
  type,
  props,
  key,
  ref,
});

const createText = (vnode) => ({
  type: "#text",
  props: { nodeValue: vnode + "" },
});

const Fragment = (props) => {
  return props.children;
};

const memo = (fn) => {
  fn.memo = true;
  return fn;
};

export { createText, h, Fragment, memo };
