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
    jsPsych.finishTrial(data);
  };

  console.log(display_element);
  ReactDOM.render(
    <GridWorldApp configYaml={configYaml} onFinish={onFinish} />,
    display_element
  );
}
