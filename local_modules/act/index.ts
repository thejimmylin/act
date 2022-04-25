/**
 * Type alias.
 */
type Component = (props: Props) => Renderable | Array<Renderable>;
type Props = { children: Array<Renderable> };
type Renderable = string | JsxElement;
type JsxElement = { tag: Tag; props: Props };
type Tag = string | Component;

/**
 * All JSX strings are passed to this function to create JSX elements.
 */
const createJsxElement = (tag: Tag, attrs: {}, ...children: Array<Renderable>): JsxElement => {
  const props = { ...attrs, children };
  return { tag, props };
};

/**
 * A JSX fragment element (`</>`).
 * It is just a totally valid component.
 */
const JsxFragment = (props: Props): Renderable | Array<Renderable> => {
  return props.children;
};

/**
 * Update DOM style
 */
const updateDomStyle = (dom: any, style: any): void => {
  for (const [key, value] of Object.entries(style)) {
    dom.style[key] = value;
  }
};

/**
 * Update DOM attributes
 */
const updateDomAttrs = (dom: any, attrs: any): void => {
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "style") {
      updateDomStyle(dom, value);
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
const updateDom = (dom: any, props: any): void => {
  const { children, ...attrs } = props;
  if (attrs) updateDomAttrs(dom, attrs);
  if (children) dom.replaceChildren(...children);
};

/**
 * Create DOM
 */
const createDom = (tag: string, props: any) => {
  const dom = document.createElement(tag);
  updateDom(dom, props);
  return dom;
};

/**
 * Given a component, render it to return a virtual DOM
 */
const renderJsxElement = (comp: Renderable | Array<Renderable>) => {
  if (typeof comp === "string") return comp;
  if (Array.isArray(comp)) return comp.map(renderJsxElement).flat();
  const { tag, props } = comp;
  if (typeof tag === "function") return renderJsxElement(tag(props));
  return { tag, props: { ...props, children: renderJsxElement(props.children) } };
};

/**
 * Given a virtual DOM, render it to return a DOM
 */
const renderVdom = (vdom) => {
  if (typeof vdom === "string") return vdom;
  if (Array.isArray(vdom)) return vdom.map(renderVdom);
  const { tag, props } = vdom;
  return createDom(tag, { ...props, children: renderVdom(props.children) });
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
  const vdom = renderJsxElement(app.rootComp);
  const dom = renderVdom(vdom);
  const children = Array.isArray(dom) ? dom : [dom];
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

export { createJsxElement, JsxFragment, useState, mount };
