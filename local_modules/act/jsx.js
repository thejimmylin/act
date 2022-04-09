const createElement = (tag, props, ...children) => {
  props = props || {};
  props.children = children;
  return { tag, props };
};

const Fragment = (props) => {
  return props.children;
};

export { createElement, Fragment };
