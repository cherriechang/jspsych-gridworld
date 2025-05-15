import React from "react";
import { useTrial } from "./hooks/useTrial";
import { GridView } from "./components/GridView";
import { InventoryView } from "./components/InventoryView";
import { StepsRemainingView } from "./components/StepsRemainingView";
import { EndConditionView } from "./components/EndConditionView";
import {
  trial1config,
  trial2config,
  trial3config,
  trial4config,
  trial5config,
  trial6config,
} from "./config/trialYaml";
import "./index.css";

export default function App() {
  let trialConfig = trial5config;
  const { world } = useTrial(trialConfig);

  if (!world) {
    return <div className="app-wrapper">Loading…</div>;
  }

  return (
    <div className="app-wrapper">
      {/* Header now at the very top */}
      <h1 className="app-header">Gridworld Demo</h1>

      {/* Three-column layout */}
      <div className="app-container">
        <div className="sidebar-left">
          <StepsRemainingView stepsRemaining={world.agent.stepsRemaining} />
          <InventoryView world={world} />
        </div>

        <div className="main-view">
          <GridView world={world} tileSize={60} />
        </div>

        <div className="sidebar-right">
          <EndConditionView rawConfig={trialConfig} world={world} />
        </div>
      </div>
    </div>
  );
}
