const updateDomStyle = ({ dom, style }) => {
  for (const [key, value] of Object.entries(style)) {
    dom.style[key] = value;
  }
};

const updateDomAttrs = ({ dom, attrs }) => {
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "style") {
      updateDomStyle({ dom, style: value });
    } else {
      dom.setAttribute(key, value);
    }
  }
};

const updateDom = ({ dom, props }) => {
  const { children, ...attrs } = props;
  if (attrs) updateDomAttrs({ dom, attrs });
  if (children) dom.replaceChildren(...children);
};

const createDom = ({ tag, props }) => {
  const dom = document.createElement(tag);
  updateDom({ dom, props });
  return dom;
};

export { createDom };
