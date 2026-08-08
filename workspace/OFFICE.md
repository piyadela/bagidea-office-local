# OFFICE.md — shared office knowledge

(The owner can edit this from the 🗂 NOTES tab. Every agent knows where this file is and reads it only when it's relevant to the work. Write in any language.)

## About the owner
- 

## Office rules
- 

## Systems & Shared Tools

### mongomodeleditor (MongoDB Schema & Workflow Designer)
- **Repository**: [GitHub - jaturapornchai/mongomodeleditor](https://github.com/jaturapornchai/mongomodeleditor)
- **Description**: Next.js 16 + React 19 + TypeScript + Zod 4 + Tailwind CSS 4 visual Schema & Workflow Designer with built-in MCP Server (`npm run mcp:stdio` / `/mcp`).
- **Core Functionality**:
  - **Schema Designer** (`app/schema.ts`): Visual editing of collections, fields, indexes, types (Decimal128, embed/ref, self-ref, enum). Generates Mongoose models, Zod schemas, TypeScript types, Next.js REST API routes, seeders, and Wiki docs.
  - **Workflow Engine & Visual Editor** (`app/workflow.ts`, `app/workflow-editor.tsx`, `app/workflow-layout.ts`): React Flow + ELK graph editor with trigger/action/condition/transform nodes. Includes Babylon.js 3D navigation (`app/workflow-3d/viewer.tsx`).
  - **MCP Integration** (`app/mcp/server.ts`, `app/mcp/route.ts`): Native MCP server allowing AI agents to query/edit schemas and workflows.
  - **Data Sync & Storage** (`data/projects.json`, `app/store.ts`): Central JSON storage with optimistic concurrency (`rev`) and up to 20 automatic snapshots in `data/history/`.
  - **ERP Example**: Includes `erp-example.json` (5 modules, 16 collections, 116 fields).
- **Developer Commands**:
  - Dev server (port 3100): `npm run dev`
  - Regression tests: `npm test`
  - ESLint check: `npm run lint`
  - Production build: `npm run build`
  - MCP stdio transport: `npm run mcp:stdio`
  - Docker container: `npm run docker:up`


## Project Specific Rules

### FB_Inter (Untold History & Space Stories)
- **Target Audience**: Tier-1 International English Markets (US, UK, CA, AU — Ages 25–54)
- **Language Policy**: **100% ENGLISH ONLY**. ALL Facebook posts, captions, headlines, hooks, hashtags, and image/video prompts MUST be generated in English (Deep Documentary Tone B1, "Where History Meets the Cosmos"). NEVER generate Thai text for FB_Inter Facebook posts.
- **Page Access Token**: Configured in `FB_Inter/.env` (`FACEBOOK_PAGE_ACCESS_TOKEN`) and connected to Facebook Page `Untold History & Space Stories` (Page ID `61578619623871`). Auto-posting via Graph API `/v20.0/61578619623871/feed`.
