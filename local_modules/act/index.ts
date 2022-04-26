/**
 * Type alias.
 */
type Some<T> = T | Array<T>;
type Component = (props: Props) => Some<Renderable>;
type Props = { children?: Array<Renderable> };
type Renderable = string | JsxElement;
type JsxElement = { tag: Tag; props: Props };
type Tag = string | Component;

/**
 * All JSX expressions will be passed to this function to create JSX elements.
 */
const createJsxElement = (tag: Tag, props: Props, ...children: Array<Renderable>): JsxElement => {
  props = { ...props, children };
  return { tag, props };
};

/**
 * A JSX fragment element (`<></>`).
 * It is actually just a totally valid component.
 */
const JsxFragment: Component = (props) => {
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
const render = (renderable: Some<Renderable>) => {
  if (typeof renderable === "string") return renderable;
  if (Array.isArray(renderable)) return renderable.map(render).flat();
  const { tag, props } = renderable;
  if (typeof tag === "function") return render(tag(props));
  return createDom(tag, { ...props, children: render(props.children) });
};

/**
 * A global app object.
 */
const app = {
  mounted: false,
  renderable: null,
  container: null,
  state: {},
};

/**
 * The main API of the library, usually used to mount a root component in a DOM.
 */
const mount = (renderable: Some<Renderable>, container: any): void => {
  app.renderable = renderable;
  app.container = container;
  renderDom();
  app.mounted = true;
};

/**
 * Render the mounted renderable in the DOM container.
 */
const renderDom = (): void => {
  const someDom = render(app.renderable);
  const doms = Array.isArray(someDom) ? someDom : [someDom];
  app.container.replaceChildren(...doms);
};

/**
 * Get the state of the app.
 */
const getState = (initialState: any) => (app.mounted ? app.state : initialState);

/**
 * Set the state of the app.
 */
const _setState = (newState: any) => {
  app.state = { ...app.state, ...newState };
};

/**
 * Initialize the state of the app.
 */
const initState = (initialState: any) => {
  if (!app.mounted) _setState(initialState);
};

/**
 * Set the state of the app and re-render.
 */
const setState = (newState: any) => {
  _setState(newState);
  renderDom();
};

/**
 * The useState API. It's a hook that returns a pair of state and setState.
 * Because it may be called when the app is not completely mounted, we need
 * to use some tricks to make sure the state is initialized properly.
 */
const useState = (initialState: any) => {
  initState(initialState);
  return [getState(initialState), setState];
};

export { createJsxElement, JsxFragment, useState, mount };
