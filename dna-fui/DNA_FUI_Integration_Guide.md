# DNA Canvas FUI — Data contract v1

The UI is an **operational read model**, not a control plane or source of truth. Core runtime, workflow, attempts, worker leases, cost ledger, tests and job state belong to DNA. The FUI does not trigger agents or decide workflow transitions.

## Files

| File | Purpose |
| --- | --- |
| `DNA_FUI_API_Ready.html` | Standalone v3-preserving Canvas UI with mock embedded; exposes `DNA_FUI.setSnapshot`, `DNA_FUI.ingest`, `DNA_FUI.connect`, `DNA_FUI.openPanel` |
| `dna.fui.mock.snapshot.json` | **Replace this data shape** with API snapshot; mock embedded in HTML to make file:// viewing work |
| `dna.fui.snapshot.v1.schema.json` | Versioned JSON schema, full read model |
| `dna.fui.sample.events.jsonl` | Sample one-event-per-line server events |
| `dna.fui.event.v1.schema.json` | Event envelope validation |

## Architecture

```text
DNA SQL + runtime (authoritative)
         │
         ├── GET /api/dna/fui/snapshot  ─────→ Initial load + every 15s reconciliation
         │
         └── GET /api/dna/fui/events    ─SSE─→ Runtime event animations, lower latency
                                                │
                                       Canvas render state
```

**Recommended transport**: SSE for the one-way event feed + snapshots every 15s. Keep the FUI server push about *committed events*, not token-consuming agent polls. SSE naturally reconnects, supports `id:` and `Last-Event-ID`, and is lighter to implement than full WebSocket. Use WebSocket only when user-to-server interactive commands require it; ordinary HTTP POST works for approvals/commands.

## Browser usage

Open HTML directly for mock demonstration. The JSON snapshot is embedded in HTML to avoid `file://` fetch restrictions. Later connect it via your Node/Express backend using the browser console or on page initialization:

```js
await DNA_FUI.connect({baseUrl:'/api/dna/fui',transport:'sse',pollMs:15000});
```

Alternatively manually inject data from any API client:

```js
DNA_FUI.setSnapshot(snapshot, {source:'api'});
DNA_FUI.ingest(event);
DNA_FUI.openPanel('workflow');
DNA_FUI.openPanel('execution');
DNA_FUI.openPanel('swarm');
```

**Endpoints**:

- `GET /api/dna/fui/snapshot` → JSON matching `dna.fui.snapshot.v1.schema.json`. May support `?jobId=` to choose focus; `snapshotId` and `generatedAt` identify read generation; include `lastEventId` cursor. Always return absolute values.
- `GET /api/dna/fui/events?since=evt-000288` → `text/event-stream`, each record like `id: evt-000289\ndata: {JSON event envelope}\n\n`. On disconnect, honor `Last-Event-ID` and replay missed events or signal a gap requiring snapshot reconciliation.
- Optional later: `GET /api/dna/fui/jobs/:id`, `/batches/:id`, `/items?cursor=...`, `/node-instances/:id/attempts`, `/test-runs/:id`, and `/artifacts/:id` for modal drilldowns. Do not ship thousands of items in the top-level snapshot.

## Update cadence

| Data | Ideal trigger | Reconcile |
| --- | --- | --- |
| Node, agent, messages, tool calls, attempts | SSE events on committed state transitions | Every 15 seconds |
| Tokens/cost | `usage.updated` event after provider usage or ledger write | Every 15 seconds |
| Host metrics, worker counts, queue | Sample in backend every 5–15 seconds | Every 15 seconds |
| Job/workflow DAG | SSE on change, snapshot includes current plan revision | Every 15 seconds |
| Tests, failures, alerts, human approvals | SSE at change | Every 15 seconds |
| Swarm item counts | Aggregate in backend; max ~1/sec if extremely busy | Every 15 seconds |
| Heartbeat | Small engine heartbeat update ~5 seconds | Treat >20 seconds as STALE, not automatically dead |

## Contract rules

1. `snapshot` is authoritative, `events` are ordered hints + animation triggers. Snapshots overwrite divergent local state. No fabricated progress percentages in production; `progress: null` means unknown.
2. **DNA Core** is `kind:"system"` (not an agent). Agent nodes use stable IDs, not display names. `topology.edges` use these IDs.
3. Separate **Job → ProcessInstance → NodeInstance → Attempt → Worker**. Node execution attempts need stable IDs, attempt numbers and lease timestamps; do not imply a retry is a different logical node.
4. Workflow dependencies live in `workflow.nodes[].dependsOn`; the sequence line is an *ordered projection*, not the entire DAG. JOIN must not claim completion until all mandatory predecessors have completed.
5. Human approval states are not inferred from agent silence. Sleep/wait is a runtime state; do not burn tokens polling; workers wake on events or scheduled runtime timers.
6. `billing.totalCostUsd` is authoritative; `costEstimated` indicates when ledger uses estimates. Price changes must be handled by the backend. Tokens are integer totals; event deltas must be deduplicated by event ID.
7. Include only recent events (`recentEvents` bounded). For full logs, fetch pages separately, filter/redact secrets, use server-side pagination.
8. Batch summaries are aggregated. Never send 10k item objects on the main JSON, and never draw 10k individual cells. Drill down per batch/worker, fetch items only if requested.
9. The system heartbeat is independent of any AI agent. `paused` in the UI means playback paused; it is **not** engine dead. Display STALE if heartbeat has aged beyond your threshold.
10. Version both JSON shapes (`schemaVersion`). Preserve forward-compatible unknown fields but validate required fields on the server. Event sequence monotonicity should be per stream and replayable.
11. Auth should use same-origin cookies or secured reverse proxy, not API keys in the browser or query string. SSE should disable proxy buffering and send occasional keepalive comments. Apply access control for logs, prompts and artifacts.

## Existing 10 panel drilldowns

| ID | Panel | Source | Click ↗ shows |
| --- | --- | --- | --- |
| 01 | System state | `system.metrics` + `heartbeatAt` | Host, worker pool, queue, heartbeat, runtime version |
| 02 | Token accounting | `billing` | Model-wise token and USD ledger + budgets |
| 03 | Model router | `models` | Model utilization/latency and selection evidence placeholder |
| 04 | Cellular topology | `agents`, `topology` | Roles, current states, models, connections; click cell to inspect |
| 05 | Current execution | `jobs`, `nodeAttempts`, `focus` | Jobs, NodeInstance / Attempt IDs, worker leases, human actions |
| 06 | Sequenced workflow | `workflow.nodes` | Dependency list, progress, attempts, and sequence; swarm modal also available |
| 07 | Cell diagnostics | `agents` | Node state, tokens, calls, last event |
| 08 | Instrument trace | `telemetry` | Samples and time window |
| 09 | Event / log | `recentEvents`, SSE | Detailed chronological event history |
| 10 | Health / acceptance | `tests`, `alerts` | Machine-verified pass/fail, commands and diagnostic alerts |

## Important Ghost-inspired views to discuss (not forced into this layout)

- **Whole-plan hierarchy**: project → job → major phase → task → subtask; keep plan revision/change history.
- **Attempts & evidence**: click NodeInstance to inspect each Attempt, inputs, outputs, commands, terminal exit codes, repair evidence, artifacts, tests.
- **Human inbox**: approvals, blocked decisions, timeouts and escalations.
- **Worker control**: leases, deadlines, capacity, idempotency, retries/backoff, event-driven wakeups.
- **Usage/budget/selection audit**: per model/agent/job/batch spend, budget limits, model-selection reasons vs task capability profile.
- **Swarm microscope**: batches → worker assignments → failed item retry samples, each fetched on demand.

The test JSON and events represent **invented example data**, not live DNA measurements. They are only for UI integration and schema testing.