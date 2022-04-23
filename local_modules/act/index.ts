/**
 * An extended `typeof`.
 * It returns `"array"` for an array instead of `"object"`.
 */
const typeOf = (value: unknown) => {
  if (Array.isArray(value)) return "array";
  return typeof value;
};

/**
 * All JSX elements would be passed to this function.
 * `tag` could be a function when it's a component. Otherwise, it's a string.
 */
type Component = (props: Props) => JsxElement | Array<JsxElement>;
type JsxElement = string | { tag: Tag; props: Props };
type Tag = string | Component;
type Attrs = {};
type Props = { children: Array<JsxElement> };

const jsxFactory = (tag: Tag, attrs: Attrs, ...children: Array<JsxElement>): JsxElement => {
  const props: Props = { ...attrs, children };
  return { tag, props };
};

/**
 * A JSX fragment element (`</>`) is just a normal component.
 */
const JsxFragment: Component = (props) => {
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
    } else if (key.startsWith("on")) {
      const eventName = key.slice(2).toLowerCase();
      dom.addEventListener(eventName, value);
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
  return createDom({
    tag,
    props: { ...props, children: renderVdom(props.children) },
  });
};

/**
 * A global app object.
 */
const app = {
  mounted: false,
  rootComp: null,
  container: null,
  state: {},
};

/**
 * The main API of the library, used to mount a root component in a DOM.
 * A root component is a function that returns a virtual DOM.
 */
const mount = (rootComp, container) => {
  app.rootComp = rootComp;
  app.container = container;
  render();
  app.mounted = true;
};

/**
 * Render the root component to the container.
 */
const render = () => {
  const vdom = renderComp(app.rootComp);
  const dom = renderVdom(vdom);
  const children = typeOf(dom) === "array" ? dom : [dom];
  app.container.replaceChildren(...children);
};

/**
 * Get the state of the app.
 */
const getState = (initialState) => (app.mounted ? app.state : initialState);

/**
 * Set the state of the app.
 */
const _setState = (newState) => {
  app.state = { ...app.state, ...newState };
};

/**
 * Initialize the state of the app.
 */
const initState = (initialState) => {
  if (!app.mounted) _setState(initialState);
};

/**
 * Set the state of the app and re-render.
 */
const setState = (newState) => {
  _setState(newState);
  render();
};

/**
 * The useState API. It's a hook that returns a pair of state and setState.
 * Because it may be called when the app is not completely mounted, we need
 * to use some tricks to make sure the state is initialized properly.
 */
const useState = (initialState) => {
  initState(initialState);
  return [getState(initialState), setState];
};

export { jsxFactory, JsxFragment, useState, mount };
