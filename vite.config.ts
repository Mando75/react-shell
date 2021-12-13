import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src", "lib"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src", "lib", "react-shell.tsx"),
      name: "ReactShell",
      fileName: (format) => `react-shell.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
