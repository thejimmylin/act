// DOM
const updateDomStyle = ({ dom, style }) => {
  for (const [key, value] of Object.entries(style)) {
    dom.style[key] = value;
  }
};

const updateDomAttrs = ({ dom, attrs }) => {
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "style") {
      updateDomStyle({ dom, style: value });
    } else {
      dom[key] = value;
    }
  }
};

const updateDomChildren = ({ dom, children }) => {
  if (typeof children === "string") {
    dom.innerText = children;
  } else {
    dom.replaceChildren(children);
  }
};

const updateDom = ({ dom, attrs, children }) => {
  if (attrs) updateDomAttrs({ dom, attrs });
  if (children) updateDomChildren({ dom, children });
};

const createDom = ({ tagName, attrs, children }) => {
  const dom = document.createElement(tagName);
  updateDom({ dom, attrs, children });
  return dom;
};

const createElement = (tagName, attrs, ...children) => {
  attrs = attrs || {};
  children = children || [];
  let returned;
  if (typeof tagName === "string") {
    returned = { tagName, attrs, children };
  } else if (typeof tagName === "function") {
    returned = tagName(attrs);
  }
  console.log("createVdom");
  console.log(returned);
  return returned;
};

const createRoot = (container) => {
  const vdom = {};
  const mount = () => {};
  const unmount = () => {};
  const root = {
    container,
    vdom,
    mount,
    unmount,
  };
  return root;
};

export { createElement };
export { createRoot };
