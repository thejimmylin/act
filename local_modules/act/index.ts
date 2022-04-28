/**
 * Type aliases.
 */
type Component = (props: Props) => Renderable;
type Props = { children: Array<JsxNode> };
type Renderable = JsxNode | Array<JsxNode>;
type JsxNode = JsxElement | string;
type JsxElement = { tag: Tag; props: Props };
type Tag = string | Component;

/**
 * A JSX element expression is just a call to this function.
 */
function createJsxElement(tag: Tag, attrs: Partial<Props>, ...children: Array<JsxNode>): JsxElement {
  const props: Props = { ...attrs, children };
  return { tag, props };
}

/**
 * A JSX fragment expression is just a normal component.
 */
function JsxFragment(props: Props): Renderable {
  return props.children;
}

/**
 * Update DOM attributes.
 */
function updateDomAttrs(dom: any, attrs: any): void {
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "styles") {
      Object.assign(dom.style, value);
    } else if (key.slice(0, 2) === "on") {
      dom.addEventListener(key.slice(2).toLowerCase(), value);
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
  if (attrs) updateDomAttrs(dom, attrs);
  if (children) dom.replaceChildren(...children);
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
function render(renderable: Renderable): Renderable {
  if (Array.isArray(renderable)) return renderable.map(render).flat();
  if (typeof renderable === "string") return renderable;
  const { tag, props } = renderable;
  if (typeof tag === "function") return render(tag(props));
  return createDom(tag, { ...props, children: render(props.children) });
}

/**
 * A global app object.
 */
const app: any = {
  mounted: false,
  renderable: undefined,
  container: undefined,
  state: {},
};

/**
 * Rerender the mounted renderable in the DOM container.
 */
function rerender(): void {
  const children = [render(app.renderable)].flat();
  app.container.replaceChildren(...children);
}

/**
 * The main API of the library, usually used to mount a root component in a DOM.
 */
function mount(renderable: Renderable, container: HTMLElement): void {
  app.renderable = renderable;
  app.container = container;
  rerender();
  app.mounted = true;
}

/**
 * The `setState` function.
 */
function setState(newState: any) {
  app.state = { ...app.state, ...newState };
  rerender();
}

/**
 * The `useState` hook.
 */
function useState(initialState: any) {
  if (!app.mounted) app.state = initialState;
  return [app.state, setState];
}

export { createJsxElement, JsxFragment, mount, useState };
