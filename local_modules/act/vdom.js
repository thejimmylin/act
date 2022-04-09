import { createDom } from "./dom";

const createElement = (tag, props, ...children) => {
  props = props || {};
  props.children = children;
  return { tag, props };
};

const renderComponent = (component) => {
  if (typeof component === "string") return component;
  if (typeof component.tag === "function")
    return renderComponent(component.tag(component.props));
  if (component.length > 0) {
    console.log(component);
    component = component[0];
  }
  const { tag, props } = component;
  return {
    tag,
    props: { ...props, children: props.children.map(renderComponent) },
  };
};

const renderDom = (vdom) => {
  if (typeof vdom === "string") return vdom;
  const { tag, props } = vdom;
  return createDom({
    tag,
    props: { ...props, children: props.children.map(renderDom) },
  });
};

const render = (rootComponent, domContainer) => {
  const vdom = renderComponent(rootComponent);
  const dom = renderDom(vdom);
  domContainer.replaceChildren(dom);
};

export { createElement, render };
