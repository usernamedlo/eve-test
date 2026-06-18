import { defineEval } from "eve/evals";

// File path is the eval id: evals/pricing/lookup.eval.ts -> "pricing/lookup".
export default defineEval({
  description: "Pricing questions go through the get_card_price tool.",
  async test(t) {
    await t.send("What's a near mint Charizard Base Set worth?");

    // Gates (must pass): the run finished cleanly and used the tool instead of
    // hallucinating a number.
    t.completed();
    t.calledTool("get_card_price");

    // Soft check (tracked, won't fail the eval on phrasing): the tool's number
    // (320 * 0.85 = 272 EUR) made it into the answer.
    t.messageIncludes("272").soft();
  },
});
