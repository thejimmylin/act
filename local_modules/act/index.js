// DOM
const updateDomStyle = (dom, style) => {
  for (const [key, value] of Object.entries(style)) {
    dom.style[key] = value;
  }
};

const updateDomAttrs = (dom, attrs) => {
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "style") {
      updateDomStyle(dom, value);
    }
  }
};

const updateDomChildren = (dom, children) => {
  if (typeof children === "string") {
    dom.innerText = children;
  } else {
    dom.replaceChildren(children);
  }
};

const createDom = ({ tagName, attrs, children }) => {
  const dom = document.createElement(tagName);
  if (attrs) updateDomAttrs(dom, attrs);
  if (children) updateDomChildren(dom, children);
  return dom;
};

// VDOM
const createVdom = (tag, props, ...children) => {
  props = props || {};
  props.children = children.length > 0 ? children : props.children;
  if (typeof tag === "string") {
    return { tag, props };
  } else {
    const component = tag;
    return component(props);
  }
};

const render = (vdom, dom) => {
  dom.replaceChildren(
    createDom({
      tagName: "p",
      attrs: { style: { fontSize: "32px", color: "pink" } },
      children: "Hello world",
    })
  );
};

export { createVdom };
export { render };
