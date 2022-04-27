/**
 * Type aliases.
 */
type Component = (props: {}) => Renderable;
type Renderable = JsxNode | Array<JsxNode>;
type JsxElement = { tag: Tag; props: Props };
type JsxNode = JsxElement | string;
type Tag = string | Component;
type Props = { children: Array<JsxNode> };

/**
 * A JSX element expression is just a call to this function.
 */
function createJsxElement(tag: Tag, props: {}, ...children: Array<JsxNode>): JsxElement {
  const jsxElement = { tag, props: { ...props, children } };
  return jsxElement;
}

/**
 * A JSX fragment expression is just a normal component.
 */
function JsxFragment(props: Props): Renderable {
  return props.children;
}

/**
 * Update DOM style.
 */
function updateDomStyle(dom: any, style: any): void {
  for (const [key, value] of Object.entries(style)) {
    dom.style[key] = value;
  }
}

/**
 * Update DOM attributes.
 */
function updateDomAttrs(dom: any, attrs: any): void {
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "style") {
      updateDomStyle(dom, value);
    } else if (key.slice(0, 2) === "on") {
      const eventType = key.slice(2).toLowerCase();
      const listener = value;
      dom.addEventListener(eventType, listener);
    } else {
      dom.setAttribute(key, value);
    }
  }
}

/**
 * Update DOM.
 */
function updateDom(dom: any, props: any): void {
  const { children, ...attrs } = props;
  if (attrs) {
    updateDomAttrs(dom, attrs);
  }
  if (children) {
    dom.replaceChildren(...children);
  }
}

/**
 * Create DOM.
 */
function createDom(tag: string, props: any): any {
  const dom = document.createElement(tag);
  updateDom(dom, props);
  return dom;
}

/**
 * Given a component, render it to return a virtual DOM.
 */
function render(renderable: Renderable) {
  if (Array.isArray(renderable)) {
    return renderable.map(render).flat();
  }
  if (typeof renderable === "string") {
    return renderable;
  }
  const { tag, props } = renderable;
  if (typeof tag === "function") {
    return render(tag(props));
  }
  return createDom(tag, { ...props, children: render(props.children) });
}

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
function mount(renderable: Renderable, container: HTMLElement): void {
  app.renderable = renderable;
  app.container = container;
  renderDom();
  app.mounted = true;
}

/**
 * Render the mounted renderable in the DOM container.
 */
function renderDom(): void {
  app.container.replaceChildren(...[render(app.renderable)].flat());
}

/**
 * The useState API.
 */
function useState(initialState: any) {
  if (!app.mounted) {
    app.state = initialState;
  }
  const state = app.mounted ? app.state : initialState;
  const setState = (newState: any) => {
    app.state = { ...app.state, ...newState };
    renderDom();
  };
  return [state, setState];
}

export { createJsxElement, JsxFragment, useState, mount };
