function createElement(tag, props, ...children) {
  const element = { tag, props: { ...props, children } };
  return element;
}

function Fragment(props) {
  return props.children;
}

const createRoot = (container) => {
  const vdom = {};
  const mount = () => {};
  const unmount = () => {};
  const root = {
    container,
    vdom,
    mount,
    unmount,
  };
  return root;
};

export { createElement, Fragment, createRoot };
