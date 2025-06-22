import type { BunFile } from "bun";

export default {
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "node",
  format: "esm",
  splitting: true,
  sourcemap: "external",
  minify: false,
  external: [],
};
