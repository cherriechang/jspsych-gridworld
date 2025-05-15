import React from "react";
import { useTrial } from "../hooks/useTrial";
import { GridView } from "./GridView";
import { InventoryView } from "./InventoryView";
import { StepsRemainingView } from "./StepsRemainingView";
import { EndConditionView } from "./EndConditionView";
import {
  trial1config,
  trial2config,
  trial3config,
  trial4config,
  trial5config,
  trial6config,
} from "../config/trialYaml";
import "./index.css";

/** 
 * The props that the jsPsych wrapper will hand to your React app. 
 */
export interface GridWorldAppProps {
  /** The raw YAML string (general/items/end_condition) */
  rawYaml: string;
  onFinish: (data: {
    final_steps: number;
  }) => void;
}

/**
 * Your root React component for the plugin.
 */
export default function GridWorldApp({
  rawYaml,
  onFinish,
}: GridWorldAppProps) {
  const { world } = useTrial(rawYaml, onFinish);

  if (!world) {
    return <div className="app-wrapper">Loading…</div>;
  }

  return (
    <div className="app-wrapper">
      <h1 className="app-header">Gridworld Demo</h1>
      <div className="app-container">
        <div className="sidebar-left">
          <StepsRemainingView stepsRemaining={world.agent.stepsRemaining} />
          <InventoryView world={world} />
        </div>
        <div className="main-view">
          <GridView world={world} tileSize={60} />
        </div>
        <div className="sidebar-right">
          <EndConditionView rawConfig={rawYaml} world={world} />
        </div>
      </div>
    </div>
  );
}
