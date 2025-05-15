import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/GridWorldApp";

/**
 * Entry point: mount App into #root.
 */
createRoot(document.getElementById("root")!).render(<App />);
