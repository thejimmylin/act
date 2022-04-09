import { createDom } from "./dom";
import { typeOf } from "./utils";

const createElement = (tag, props, ...children) => {
  props = props || {};
  props.children = children;
  return { tag, props };
};

const renderComp = (comp) => {
  if (typeOf(comp) === "string") return comp;
  if (typeOf(comp) === "array") return comp.map(renderComp).flat();
  const { tag, props } = comp;
  if (typeOf(tag) === "function") return renderComp(tag(props));
  return {tag, props: { ...props, children: renderComp(props.children) }};
};

const renderVdom = (vdom) => {
  if (typeOf(vdom) === "string") return vdom;
  if (typeOf(vdom) === "array") return vdom.map(renderVdom);
  const { tag, props } = vdom;
  return createDom({tag, props: { ...props, children: renderVdom(props.children) }});
};

const render = (comp, div) => {
  const vdom = renderComp(comp);
  const dom = renderVdom(vdom);
  const children = typeOf(dom) === "array" ? dom : [dom];
  div.replaceChildren(...children);
};

export { createElement, render };
