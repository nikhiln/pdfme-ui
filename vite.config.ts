import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import path from "path";

export default defineConfig(({ mode }) => {
  return {
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
      global: {}, // Required for Node.js global polyfills
    },
    plugins: [react(), tsconfigPaths({ root: "." }), cssInjectedByJsPlugin()],
    resolve: {
      alias: {
        buffer: path.resolve(__dirname, "node_modules/buffer"),
      },
    },
    build: {
      lib: {
        entry: "src/index.ts",
        name: "@pdfme/ui",
        fileName: (format) => `index.${format}.js`,
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom", "pdfjs-dist", "antd", "buffer"], // Ensure Buffer polyfill is included
      exclude: ["@pdfme/common", "@pdfme/schemas"],
    },
  };
});
