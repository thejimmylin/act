import { createDom } from "./dom";

const createElement = (tag, attrs, ...children) => {
  return { tag, attrs, children };
};

const renderVdom = (component) => {
  if (typeof component === "string") return component;
  const { tag, attrs, children } = component;
  if (typeof tag === "function") return renderVdom(tag(attrs));
  return { tag, attrs, children: children.map(renderVdom) };
};

const renderDom = (vdom) => {
  if (typeof vdom === "string") return vdom;
  const { tag: tagName, attrs, children } = vdom;
  return createDom({ tagName, attrs, children: children.map(renderDom) });
};

const render = (rootComponent, domContainer) => {
  const vdom = renderVdom(rootComponent);
  const dom = renderDom(vdom);
  domContainer.replaceChildren(dom);
};

export { createElement, render };
