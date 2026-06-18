# Démo eve — Pokédex Pricing

Petit agent de test pour découvrir le framework [eve](https://github.com/vercel/eve)
de Vercel (v0.11.4). Il estime le prix de cartes Pokémon et passe des ordres
d'achat, en illustrant les 4 primitives principales du framework.

## Prérequis

- **Node >= 24** (eve l'impose). Ici : `/opt/homebrew/opt/node@24/bin` (v24.3.0).
- Une clé d'accès modèle dans `.env.local` (chargé automatiquement par eve) :
  `ANTHROPIC_API_KEY=...` (le plus simple) **ou** `AI_GATEWAY_API_KEY=...`.

## Ce que la démo montre

| Fichier | Primitive | Ce que ça illustre |
| --- | --- | --- |
| `agent/agent.ts` | `defineAgent` | choix du modèle (`anthropic/claude-sonnet-4.6`) |
| `agent/instructions.md` | instructions | system prompt / identité de l'agent |
| `agent/tools/get_card_price.ts` | `defineTool` | tool typé (Zod), nom = nom de fichier, exécuté dans l'app runtime |
| `agent/tools/place_buy_order.ts` | `needsApproval` | human-in-the-loop : les ordres > 100 € se mettent en pause |
| `agent/skills/grading-scale.md` | skill | connaissance chargée à la demande (progressive disclosure) |
| `evals/pricing/*.eval.ts` | `defineEval` | tests d'agent non-interactifs (`eve eval`) |

## Lancer

Toutes les commandes utilisent Node 24 :

```bash
cd /Users/loicghijselings/DEV_PERSO/eve-test
export PATH="/opt/homebrew/opt/node@24/bin:$PATH"

# 1) Inspecter l'app résolue (tools, skills, evals, routes) — pas besoin de clé
node_modules/.bin/eve info

# 2) Lancer les evals (booste un serveur local, appelle le vrai modèle -> clé requise)
node_modules/.bin/eve eval

# 3) Discuter avec l'agent dans le TUI interactif
node_modules/.bin/eve dev
```

## Évaluations incluses

- `pricing/lookup` — vérifie qu'une question de prix passe bien par le tool
  `get_card_price` (et non une réponse inventée).
- `pricing/approval` — vérifie qu'un ordre d'achat coûteux **met le run en
  pause** en attente d'une validation humaine.

> eve est en **beta** : APIs et comportements peuvent évoluer avant la GA.
