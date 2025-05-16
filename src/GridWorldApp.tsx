import React from "react";
import { useTrial } from "./hooks/useTrial";
import { GridView } from "./components/GridView";
import { InventoryView } from "./components/InventoryView";
import { StepsRemainingView } from "./components/StepsRemainingView";
import { EndConditionView } from "./components/EndConditionView";
import "./index.css";

interface GridWorldAppProps {
  configYaml: string;
  onFinish: (data: any) => void;
}

export default function GridWorldApp({
  configYaml,
  onFinish,
}: GridWorldAppProps) {
  console.log("usetrial call in gridworldAPP");
  const { world } = useTrial(configYaml, onFinish);

  if (!world) {
    console.log("loading...");
    return <div className="app-wrapper">Loading…</div>;
  }
  else {
    console.log("world loaded");
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
          <EndConditionView rawConfig={configYaml} world={world} />
        </div>
      </div>
    </div>
  );
}
