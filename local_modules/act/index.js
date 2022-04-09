/**
 * Type of a value
 */
const typeOf = (obj) => {
  if (Array.isArray(obj)) return "array";
  return typeof obj;
};

/**
 * JSX => VDOM
 */
const createElement = (tag, props, ...children) => {
  props = props || {};
  props.children = children;
  return { tag, props };
};

/**
 * Fragment
 */
const Fragment = (props) => {
  return props.children;
};

/**
 * Update DOM style
 */
const updateDomStyle = ({ dom, style }) => {
  for (const [key, value] of Object.entries(style)) {
    dom.style[key] = value;
  }
};

/**
 * Update DOM attributes
 */
const updateDomAttrs = ({ dom, attrs }) => {
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "style") {
      updateDomStyle({ dom, style: value });
    } else {
      dom.setAttribute(key, value);
    }
  }
};

/**
 * Update DOM
 */
const updateDom = ({ dom, props }) => {
  const { children, ...attrs } = props;
  if (attrs) updateDomAttrs({ dom, attrs });
  if (children) dom.replaceChildren(...children);
};

/**
 * Create DOM
 */
const createDom = ({ tag, props }) => {
  const dom = document.createElement(tag);
  updateDom({ dom, props });
  return dom;
};

/**
 * Component => VDOM
 */
const renderComp = (comp) => {
  if (typeOf(comp) === "string") return comp;
  if (typeOf(comp) === "array") return comp.map(renderComp).flat();
  const { tag, props } = comp;
  if (typeOf(tag) === "function") return renderComp(tag(props));
  return { tag, props: { ...props, children: renderComp(props.children) } };
};

/**
 * VDOM => DOM
 */
const renderVdom = (vdom) => {
  if (typeOf(vdom) === "string") return vdom;
  if (typeOf(vdom) === "array") return vdom.map(renderVdom);
  const { tag, props } = vdom;
  return createDom({ tag, props: { ...props, children: renderVdom(props.children) } });
};

/**
 * The render API
 */
const render = (comp, div) => {
  const vdom = renderComp(comp);
  const dom = renderVdom(vdom);
  const children = typeOf(dom) === "array" ? dom : [dom];
  div.replaceChildren(...children);
};

export { createElement, Fragment, render };
