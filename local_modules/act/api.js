import { createDom } from "./dom";

const getVdom = (component) => {
  const { tagName, attrs, children } = component;
  if (typeof tagName === "string") {
    return {
      tagName,
      attrs,
      children: children.map((child) =>
        typeof child === "string" ? child : getVdom(child)
      ),
    };
  } else if (typeof tagName === "function") {
    return getVdom(tagName(attrs));
  }
};

const createDomByVdom = (vdom) => {
  if (typeof vdom === "string") {
    return document.createTextNode(vdom);
  }
  const { tagName, attrs, children } = vdom;
  const dom = createDom({
    tagName,
    attrs,
    children: children.map(createDomByVdom),
  });
  return dom;
};

const updateDom = (domContainer, oldVdom, vdom) => {
  const dom = createDomByVdom(vdom);
  domContainer.replaceChildren(dom);
};

const createRoot = (domContainer) => {
  const oldVdom = {};
  const mount = (rootComponent) => {
    const vdom = getVdom(rootComponent);
    updateDom(domContainer, oldVdom, vdom);
  };
  const root = { mount };
  return root;
};

export { createRoot };
export { createElement } from "./vdom";
export { Fragment } from "./builtin-components";
