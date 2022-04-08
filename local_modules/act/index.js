const createElement = (tag, props, ...children) => {
  const element = { tag, props: { ...props, children } };
  return element;
};

const createRoot = (container) => {
  const mount = (component) => {
    console.log(component, "is mounted in the container", container);
  };
  const root = { mount };
  return root;
};

export { createElement, createRoot };
export { Fragment } from "./components";
