import { createDom } from "./dom";

const createElement = (tagName, attrs, ...children) => {
  const element = { tagName, attrs, children };
  return element;
};

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

const render = (rootComponent, domContainer) => {
  const vdom = getVdom(rootComponent);
  const dom = createDomByVdom(vdom);
  domContainer.replaceChildren(dom);
};

export { createElement, render };
