const createElement = (tag, props, ...kids) => {
  props = props || {};
  kids = kids || [];
  if (kids.length > 0) {
    props.kids = kids;
  }
  return { tag, props };
};

const Fragment = (props) => {
  return props.kids;
};

const render = (jsx, dom) => {};

export { createElement, Fragment };
export { render };
