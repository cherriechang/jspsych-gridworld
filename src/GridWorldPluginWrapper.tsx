import React from "react";
import ReactDOM from "react-dom";
import GridWorldApp from "./GridWorldApp";
import type { JsPsych } from "jspsych";

export function startGridWorldTrial(
  display_element: HTMLElement,
  configYaml: string,
  jsPsych: JsPsych
) {
  const onFinish = (data: any) => {
    // unmount the React tree
    ReactDOM.unmountComponentAtNode(display_element);
    // tell jsPsych the trial is done
    jsPsych.finishTrial(data);
  };

  ReactDOM.render(
    <GridWorldApp configYaml={configYaml} onFinish={onFinish} />,
    display_element
  );
}
