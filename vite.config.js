import { defineConfig } from "vite";

// https://vitejs.dev/guide/features.html#jsx
export default defineConfig({
  esbuild: {
    jsxInject: `import { jsxFactory, JsxFragment } from "act"`,
    jsxFactory: "jsxFactory",
    jsxFragment: "JsxFragment",
  },
});
