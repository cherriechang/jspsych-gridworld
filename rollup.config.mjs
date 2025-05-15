import { makeRollupConfig } from "@jspsych/config/rollup";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";

const configs = makeRollupConfig("jsPsychGridworld");

const externalDeps = ["react", "react-dom"];
const globalVars = {
  react: "React",
  "react-dom": "ReactDOM",
};

configs.forEach((cfg) => {
  // Externalize dependencies so they aren't bundled
  cfg.external = [...(cfg.external || []), ...externalDeps];

  // Inject the postcss plugin BEFORE existing plugins
  cfg.plugins = [
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    postcss({
      modules: false,
      extract: false,
    }),
    json(),
    ...(cfg.plugins || []),
  ];

  // Attach global names for IIFE bundles
  const outputs = Array.isArray(cfg.output) ? cfg.output : [cfg.output];
  cfg.output = outputs.map((o) => ({
    ...o,
    globals: {
      ...(o.globals || {}),
      ...globalVars,
    },
  }));
});

export default configs;
