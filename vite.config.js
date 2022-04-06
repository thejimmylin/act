import { defineConfig } from "vite";

// https://vitejs.dev/guide/features.html#jsx
export default defineConfig({
  esbuild: {
    jsxInject: `import { createElement, Fragment } from "act"`,
    jsxFactory: "createElement",
    jsxFragment: "Fragment",
  },
});
