const createRoot = (container) => {
  const mount = (component) => {
    console.log(component, "is mounted in the container", container);
  };
  const root = { mount };
  return root;
};

export { createRoot };
