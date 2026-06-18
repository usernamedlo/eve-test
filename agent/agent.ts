import { createAnthropic } from "@ai-sdk/anthropic";
import { defineAgent } from "eve";

// Direct Anthropic provider, authenticated with ANTHROPIC_API_KEY (.env.local).
// baseURL is pinned to ".../v1" on purpose: the AI SDK provider appends
// "/messages" to baseURL, but this machine exports ANTHROPIC_BASE_URL without
// the "/v1" segment, which would otherwise 404. An explicit option wins over the
// env var. (The "anthropic/claude-sonnet-4.6" string form would instead route
// through the Vercel AI Gateway and need AI_GATEWAY_API_KEY / VERCEL_OIDC_TOKEN.)
const anthropic = createAnthropic({ baseURL: "https://api.anthropic.com/v1" });

export default defineAgent({
  model: anthropic("claude-sonnet-4-6"),
});
