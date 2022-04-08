const createElement = (tag, props, ...children) => {
  const element = { tag, props: { ...props, children } };
  return element;
};

export { createElement };
