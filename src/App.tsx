import React from "react";
import { useTrial } from "./hooks/useTrial";
import { GridView } from "./components/GridView";
import "./index.css";
import { trial1config, trial2config, trial3config, trial4config } from "./config/trialYaml";

/**
 * Top‐level app component.
 */
export default function App() {
  const { world } = useTrial(trial1config);

  return (
    <div className="app-wrapper">
      <h1>GridWorld Demo</h1>
      <GridView world={world} tileSize={60} />
    </div>
  );
}
