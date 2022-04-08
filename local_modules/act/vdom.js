const createElement = (tagName, attrs, ...children) => {
  const element = { tagName, attrs, children };
  return element;
};

export { createElement };
