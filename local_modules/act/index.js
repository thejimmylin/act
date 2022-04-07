// VDOM
const createVdom = (tag, props, ...children) => {
  console.log(tag, props, children);
};

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

const render = (vdom, dom) => {
  const h1 = createDom({
    tagName: "h1",
    children: "Hello world",
  });
  const p = createDom({
    tagName: "p",
    children: "This is some style",
    attrs: {
      style: { fontSize: "32px", color: "white", backgroundColor: "pink" },
    },
  });
  dom.replaceChildren(h1, p);
};

export { createVdom };
export { render };
