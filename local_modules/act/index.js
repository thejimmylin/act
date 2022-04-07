const createElement = (tag, props, ...kids) => {
  props = props || {};
  kids = kids || [];
  if (kids.length > 0) {
    props.kids = kids;
  }
  console.log({ tag, props });
  return { tag, props };
};

const Fragment = (props) => props.children;

const render = (component, dom) => {};

export { createElement, Fragment };
export { render };
