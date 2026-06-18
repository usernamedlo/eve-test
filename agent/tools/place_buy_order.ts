import { defineTool } from "eve/tools";
import { z } from "zod";
// Human-in-the-loop policies live in "eve/tools/approval":
//   always()  -> approve before every call
//   once()    -> approve the first call in a session, then auto-allow
//   never()   -> the default when needsApproval is omitted
// import { always, once, never } from "eve/tools/approval";

export default defineTool({
  description:
    "Place a buy order for a Pokémon card, up to a maximum price in EUR.",
  inputSchema: z.object({
    card: z.string().min(1),
    maxPriceEur: z.number().positive(),
  }),
  // Predicate form: only expensive orders pause for a human. The run durably
  // parks at the approval gate and resumes exactly where it stopped once a
  // human approves in the client (TUI / web / Slack). toolInput can be
  // undefined, so guard the access.
  needsApproval: ({ toolInput }) => (toolInput?.maxPriceEur ?? 0) > 100,
  async execute({ card, maxPriceEur }) {
    // A real tool would call a marketplace API here — running in the app
    // runtime, it can read secrets from process.env that never reach the model
    // or the sandbox.
    return {
      ordered: true as const,
      card,
      maxPriceEur,
      orderId: `ord_${card.replace(/\s+/g, "-").toLowerCase()}`,
    };
  },
});
