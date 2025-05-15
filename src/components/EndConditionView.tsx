import React from "react";
import YAML from "js-yaml";
import type { ConditionNode, TrialConfig } from "../core/types";
import type { GridWorld } from "../core/GridWorld";
import { RuleEvaluator } from "../core/RuleEvaluator";

const SAT_ICON: Record<string, string> = { true: "✓", false: "✕" };
const SAT_COLOR: Record<string, string> = { true: "green", false: "red" };

interface EndConditionViewProps {
  /** Raw trial YAML string */
  rawConfig: string;
  world: GridWorld;
  title?: string;
}

/**
 * Hacky version that re-parses the full YAML in the view,
 * extracts `end_condition`, then renders it.
 */
export function EndConditionView({
  rawConfig,
  world,
  title = "Trial End Condition",
}: EndConditionViewProps) {
  // 1) parse YAML and pull out end_condition
  let condition: ConditionNode | null = null;
  try {
    const doc = YAML.load(rawConfig) as TrialConfig;
    condition = doc.end_condition;
  } catch (e) {
    return (
      <div style={{ color: "red" }}>Invalid YAML for EndConditionView</div>
    );
  }

  if (!condition) {
    return <div style={{ color: "red" }}>No end_condition found</div>;
  }

  return (
    <div style={{ textAlign: "left", fontFamily: "sans-serif" }}>
      <h3>{title}</h3>
      <ConditionNodeView node={condition} world={world} level={0} />
    </div>
  );
}

interface ConditionNodeViewProps {
  node: ConditionNode;
  world: GridWorld;
  level: number;
}

function ConditionNodeView({ node, world, level }: ConditionNodeViewProps) {
  const evaluator = new RuleEvaluator(node);
  const isSat = evaluator.evaluate(world) ? "true" : "false";
  const indent = { marginLeft: level * 16 };

  if ("and" in node) {
    return (
      <div style={indent}>
        <span style={{ color: SAT_COLOR[isSat] }}>{SAT_ICON[isSat]} AND</span>
        {node.and.map((c, i) => (
          <ConditionNodeView key={i} node={c} world={world} level={level + 1} />
        ))}
      </div>
    );
  }
  if ("or" in node) {
    return (
      <div style={indent}>
        <span style={{ color: SAT_COLOR[isSat] }}>{SAT_ICON[isSat]} OR</span>
        {node.or.map((c, i) => (
          <ConditionNodeView key={i} node={c} world={world} level={level + 1} />
        ))}
      </div>
    );
  }
  if ("not" in node) {
    return (
      <div style={indent}>
        <span style={{ color: SAT_COLOR[isSat] }}>{SAT_ICON[isSat]} NOT</span>
        <ConditionNodeView node={node.not} world={world} level={level + 1} />
      </div>
    );
  }

  // Atomic / Quantifier
  let label = "";
  if ("equals" in node) {
    label = `${node.equals.property} == ${JSON.stringify(node.equals.value)}`;
  } else if ("greater_than" in node) {
    label = `${node.greater_than.property} > ${node.greater_than.value}`;
  } else if ("less_than" in node) {
    label = `${node.less_than.property} < ${node.less_than.value}`;
  } else if ("for_all" in node) {
    label = `FOR ALL ${node.for_all.over} == ${JSON.stringify(
      node.for_all.equals
    )}`;
  } else if ("for_any" in node) {
    label = `FOR ANY ${node.for_any.over} == ${JSON.stringify(
      node.for_any.equals
    )}`;
  }

  return (
    <div style={indent}>
      <span style={{ color: SAT_COLOR[isSat] }}>{SAT_ICON[isSat]}</span> {label}
    </div>
  );
}
