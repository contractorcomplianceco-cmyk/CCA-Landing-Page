# Contractor Compliance Authority (CCA)

A responsive marketing landing page for a contractor licensing & compliance firm. The "Schedule My Compliance Review" section embeds an external Zoho Forms intake form (https://zfrmz.com/jk9ZDmCyeTP0DAEGem2r) via iframe.

Note: the `/api/leads` Express endpoint + Drizzle `leads` table from the earlier custom form are now orphaned (the page uses the external embed instead). They remain in the codebase but are unused by the frontend.

Routing (wouter): `/` → Home, `/intake` → Intake (internal QA / Qualifying Agent intake page, embeds the same Zoho form with internal-facing usage notes), `/thank-you` → ThankYou (post-submission page), catch-all → NotFound. `/intake` is an UNLISTED internal helper page for Carmen/Jestina QA use — intentionally NOT linked from public nav or footer, and the direct URL is shared with the team manually. It is publicly reachable (no auth) until a future auth task locks it down; do not add it to public navigation. The public landing page (`/`) stays client-facing with no internal QA notes. The Zoho form URL builder lives in `src/lib/zoho.ts` (`getZohoFormSrc`) and is shared by both the public home form section and `/intake`. The thank-you page fires a GA4 `generate_lead` conversion only when reached with a `?submitted=1` (or `?src=zoho-success`) marker. The Zoho form's post-submission redirect must be set (Zoho-side) to `https://contractors.ccacontact.com/thank-you?submitted=1` to connect the submit flow. Google Analytics base tag (`G-WKNFPFE43G`) lives in `index.html` and loads site-wide.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
