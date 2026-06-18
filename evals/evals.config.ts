import { defineEvalConfig } from "eve/evals";

// One config per `evals/` directory. We keep it minimal: no judge model is
// configured, so the evals rely on deterministic assertions (tool calls,
// parked approvals) rather than LLM-as-judge scoring — which means they only
// need the agent's own model credential to run.
export default defineEvalConfig({});
