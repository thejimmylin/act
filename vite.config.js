import { defineConfig } from "vite";

// https://vitejs.dev/guide/features.html#jsx
export default defineConfig({
  esbuild: {
    jsxInject: `import { h, Fragment } from "act"`,
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
});
