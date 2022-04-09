import { createDom } from "./dom";

const createElement = (tagName, attrs, ...children) => {
  return { tagName, attrs, children };
};

const renderVdom = (component) => {
  if (typeof component === "string") return component;
  const { tagName, attrs, children } = component;
  if (typeof tagName === "function") return renderVdom(tagName(attrs));
  return { tagName, attrs, children: children.map(renderVdom) };
};

const renderDom = (vdom) => {
  if (typeof vdom === "string") return vdom;
  const { tagName, attrs, children } = vdom;
  return createDom({ tagName, attrs, children: children.map(renderDom) });
};

const render = (rootComponent, domContainer) => {
  const vdom = renderVdom(rootComponent);
  const dom = renderDom(vdom);
  domContainer.replaceChildren(dom);
};

export { createElement, render };
