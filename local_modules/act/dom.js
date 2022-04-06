import { isStringLike, LANE } from "./utils";

const updateElement = (dom, oldProps = {}, newProps = {}) => {
  const allPropNames = Object.keys({ ...oldProps, ...newProps });
  for (const propName of allPropNames) {
    const oldValue = oldProps[propName];
    const newValue = newProps[propName];
    if (oldValue === newValue || propName === "children") {
      continue;
    } else if (propName === "style" && !isStringLike(newValue)) {
      const allStyleNames = Object.keys({ ...oldValue, ...newValue });
      for (const styleName of allStyleNames) {
        const oldValue = oldProps.style?.[styleName];
        const newValue = newProps.style?.[styleName];
        if (newValue !== oldValue) {
          dom.style[styleName] = newValue || "";
        }
      }
    } else if (propName.startsWith("on")) {
      const eventName = propName.replace("on", "").toLowerCase();
      if (oldValue) {
        dom.removeEventListener(eventName, oldValue);
      }
      dom.addEventListener(eventName, newValue);
    } else if (propName in dom && !(dom instanceof SVGElement)) {
      dom[propName] = newValue || "";
    } else if (newValue == null || newValue === false) {
      dom.removeAttribute(propName);
    } else {
      dom.setAttribute(propName, newValue);
    }
  }
};

const initElement = (fiber) => {
  if (fiber.type === "#text") {
    return document.createTextNode("");
  } else if (fiber.lane & LANE.SVG) {
    return document.createElementNS("http://www.w3.org/2000/svg", fiber.type);
  } else {
    return document.createElement(fiber.type);
  }
};

const createElement = (fiber) => {
  const element = initElement(fiber);
  updateElement(element, {}, fiber.props);
  return element;
};

export { updateElement, createElement };
