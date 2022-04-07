import { defineConfig } from "vite";

// https://vitejs.dev/guide/features.html#jsx
export default defineConfig({
  esbuild: {
    jsxInject: `import { createVdom } from "act"`,
    jsxFactory: "createVdom",
  },
});
