import { defineTool } from "eve/tools";
import { z } from "zod";

// The file path decides the tool name: agent/tools/get_card_price.ts -> "get_card_price".
//
// A tiny in-memory price book keeps the demo fully offline and deterministic.
// A real agent would call Cardmarket / PriceCharting here — and because tool
// `execute()` runs in the trusted app runtime (not the sandbox), it would have
// access to API keys via process.env.
const PRICE_BOOK: Record<string, number> = {
  "charizard base set": 320,
  "blastoise base set": 140,
  "umbreon vmax alt art": 410,
  "pikachu illustrator": 250000,
};

const CONDITION_MULTIPLIER = {
  mint: 1.0,
  near_mint: 0.85,
  played: 0.5,
} as const;

export default defineTool({
  description:
    "Look up the estimated market price (EUR) of a Pokémon card by name, optionally adjusted for condition.",
  inputSchema: z.object({
    card: z.string().min(1).describe("Card name, e.g. 'Charizard Base Set'"),
    condition: z
      .enum(["mint", "near_mint", "played"])
      .default("near_mint")
      .describe("Card condition; defaults to near_mint"),
  }),
  // execute receives (input, ctx). We only need the validated input here.
  async execute({ card, condition }) {
    const base = PRICE_BOOK[card.trim().toLowerCase()];
    if (base === undefined) {
      return { found: false as const, card };
    }
    const priceEur = Math.round(base * CONDITION_MULTIPLIER[condition]);
    return { found: true as const, card, condition, priceEur };
  },
});
