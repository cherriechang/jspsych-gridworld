import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json"; // <— add this
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  external: ["react", "react-dom", "jspsych"],
  plugins: [
    peerDepsExternal(),
    resolve({ extensions: [".ts", ".tsx"] }),
    commonjs(),
    json(), // <— register JSON first
    typescript({ tsconfig: "tsconfig.build.json" }),
  ],
  output: [
    {
      file: "dist/index.global.js",
      format: "umd",
      name: "jsPsychGridworld",
      globals: { react: "React", "react-dom": "ReactDOM", jspsych: "jsPsych" },
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    },
  ],
};
