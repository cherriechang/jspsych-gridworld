import {
  JsPsych,
  type JsPsychPlugin,
  ParameterType,
  type TrialType
} from "jspsych";
import { version } from "../package.json";
import React from "react";
import { createRoot } from "react-dom/client";
import GridWorldApp from "./components/GridWorldApp";

const info = <const>{
  name: "plugin-gridworld",
  version,
  parameters: {
    /** YAML string defining rows, items, and end_condition */
    trial_yaml: {
      type: ParameterType.STRING,
      default: "",
      description: "YAML config for rows, cols, items, and end_condition"
    },
    /** Pixel size of each grid cell */
    tile_size: {
      type: ParameterType.INT,
      default: 60,
      description: "Size in pixels for each grid tile"
    },
    /** CSS class(es) for the plugin container */
    css_classes: {
      type: ParameterType.STRING,
      default: "jspsych-gridworld",
      description: "Optional CSS class for the outer container"
    }
  },
  data: {
    final_steps: { type: ParameterType.INT },
    inventory:   { type: ParameterType.OBJECT },
    flags:       { type: ParameterType.OBJECT }
  },
  citations: "__CITATIONS__"
};

type Info = typeof info;

export default class GridworldPlugin implements JsPsychPlugin<Info> {
  static info = info;
  constructor(private jsPsych: JsPsych) {}

  trial(display_element: HTMLElement, trial: TrialType<Info>) {
    // 1) Create and append container
    const container = document.createElement("div");
    container.className = trial.css_classes!;
    display_element.appendChild(container);

    // 2) Mount React app
    const root = createRoot(container);
    const app = React.createElement(GridWorldApp, {
      rawYaml: trial.trial_yaml,
      onFinish: (data: any) => this.jsPsych.finishTrial(data),
    });
    root.render(app);
  }
}
