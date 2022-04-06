import { isFunction } from "./utils";
import { update, getCurrentFiber } from "./reconcile";
import { getAndIncrementCursor } from "./cursor";

const useState = (initState) => {
  return useReducer(null, initState);
};

const useReducer = (reducer, initState) => {
  const [hook, current] = getHook(getAndIncrementCursor());
  if (hook.length === 0) {
    hook[0] = initState;
    hook[1] = (value) => {
      hook[0] = reducer
        ? reducer(hook[0], value)
        : isFunction(value)
        ? value(hook[0])
        : value;
      update(current);
    };
  }
  return hook;
};

const useEffect = (cb, deps) => {
  return effectImpl(cb, deps, "effect");
};

const useLayout = (cb, deps) => {
  return effectImpl(cb, deps, "layout");
};

const effectImpl = (cb, deps, key) => {
  const [hook, current] = getHook(getAndIncrementCursor());
  if (isChanged(hook[1], deps)) {
    hook[0] = cb;
    hook[1] = deps;
    current.hooks[key].push(hook);
  }
};

const useMemo = (cb, deps) => {
  const hook = getHook(getAndIncrementCursor())[0];
  if (isChanged(hook[1], deps)) {
    hook[1] = deps;
    return (hook[0] = cb());
  }
  return hook[0];
};

const useCallback = (cb, deps) => {
  return useMemo(() => cb, deps);
};

const useRef = (current) => {
  return useMemo(() => ({ current }), []);
};

const getHook = (cursor) => {
  const current = getCurrentFiber();
  const hooks =
    current.hooks || (current.hooks = { list: [], effect: [], layout: [] });
  if (cursor >= hooks.list.length) {
    hooks.list.push([]);
  }
  return [hooks.list[cursor], current];
};

const isChanged = (a, b) => {
  return (
    !a ||
    a.length !== b.length ||
    b.some((arg, index) => !Object.is(arg, a[index]))
  );
};

export {
  useState,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useLayout,
};
