/**
 * Not like `typeof`, it can return `array` for an array.
 */
const typeOf = (value) => {
  if (Array.isArray(value)) return "array";
  return typeof value;
};

/**
 * A JSX would be passed to this function.
 */
const createVdom = (tag, props, ...children) => {
  props = props || {};
  props.children = children;
  return { tag, props };
};

/**
 * A fragment component (`<>`) would be treated as this component.
 */
const Fragment = (props) => {
  return props.children;
};

/**
 * Update DOM style
 * DOM.style is not a real object, it's a string.
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
 * Given a component, render it to return a virtual DOM
 */
const renderComp = (comp) => {
  if (typeOf(comp) === "string") return comp;
  if (typeOf(comp) === "array") return comp.map(renderComp).flat();
  const { tag, props } = comp;
  if (typeOf(tag) === "function") return renderComp(tag(props));
  return { tag, props: { ...props, children: renderComp(props.children) } };
};

/**
 * Given a virtual DOM, render it to return a DOM
 */
const renderVdom = (vdom) => {
  if (typeOf(vdom) === "string") return vdom;
  if (typeOf(vdom) === "array") return vdom.map(renderVdom);
  const { tag, props } = vdom;
  return createDom({ tag, props: { ...props, children: renderVdom(props.children) } });
};

/**
 * The `render` API, which is used to render a component to the DOM.
 */
const render = (comp, div) => {
  const vdom = renderComp(comp);
  const dom = renderVdom(vdom);
  const children = typeOf(dom) === "array" ? dom : [dom];
  div.replaceChildren(...children);
};

export { createVdom, Fragment, render };
