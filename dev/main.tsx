import React from "react";
import ReactDOM from "react-dom/client";
import GridWorldApp from "../src/GridWorldApp";

const config = `
general:
  rows: 5
  cols: 5
  start_location: [2, 2]
  total_steps: 10

items:
  Apple:
    blocks: false
    collects: true
    unique: false
    locations:
      [1, 1]: 1
    visual:
      color: "#ff0000"

end_condition:
  equals:
    property: player.steps_remaining
    value: 0
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GridWorldApp
      configYaml={config}
      onFinish={(data) => console.log("finished", data)}
    />
  </React.StrictMode>
);
