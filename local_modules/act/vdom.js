import { createDom } from "./dom";

const createElement = (tagName, attrs, ...children) => {
  return { tagName, attrs, children };
};

const getVdom = (component) => {
  if (typeof component === "string") return component;
  const { tagName, attrs, children } = component;
  if (typeof tagName === "function") return getVdom(tagName(attrs));
  return { tagName, attrs, children: children.map(getVdom) };
};

const vdomToDom = (vdom) => {
  if (typeof vdom === "string") return vdom;
  const { tagName, attrs, children } = vdom;
  return createDom({ tagName, attrs, children: children.map(vdomToDom) });
};

const render = (rootComponent, domContainer) => {
  const vdom = getVdom(rootComponent);
  const dom = vdomToDom(vdom);
  domContainer.replaceChildren(dom);
};

export { createElement, render };
