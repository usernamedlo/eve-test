import { defineEval } from "eve/evals";

// Demonstrates human-in-the-loop: an expensive order must pause for approval.
export default defineEval({
  description: "Expensive buy orders pause for human approval (HITL).",
  async test(t) {
    await t.send("Buy a Charizard Base Set for me, up to 500 euros.");

    // place_buy_order's needsApproval predicate fires (500 > 100), so instead
    // of executing, the run durably parks and waits for a human.
    t.waiting();
    t.expectInputRequests();

    // In the TUI a human would now approve; the run would resume from exactly
    // this point and execute the order. We assert the gate fired, which is the
    // deterministic part.
  },
});
