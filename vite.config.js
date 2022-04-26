import { defineConfig } from "vite";

// https://vitejs.dev/guide/features.html#jsx
export default defineConfig({
  esbuild: {
    jsxInject: `import { createJsxElement, JsxFragment } from "act"`,
    jsxFactory: "createJsxElement",
    jsxFragment: "JsxFragment",
  },
});
