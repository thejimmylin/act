import { createDom } from "./dom";

const createElement = (tag, props, ...children) => {
  props = props || {};
  return { tag, props, children };
};

const renderVdom = (component) => {
  if (typeof component === "string") return component;
  const { tag, props, children } = component;
  if (typeof tag === "function") return renderVdom(tag(props));
  return { tag, props, children: children.map(renderVdom) };
};

const renderDom = (vdom) => {
  if (typeof vdom === "string") return vdom;
  const { tag: tagName, props: attrs, children } = vdom;
  return createDom({ tagName, attrs, children: children.map(renderDom) });
};

const render = (rootComponent, domContainer) => {
  const vdom = renderVdom(rootComponent);
  const dom = renderDom(vdom);
  domContainer.replaceChildren(dom);
};

export { createElement, render };
