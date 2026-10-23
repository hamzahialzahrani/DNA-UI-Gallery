# DNA Editorial Canvas FUI

**Selected build:** [API-ready v1.1](./dna-editorial-fui-api-v1.1.html)

## Versions
- **API-ready v1.1** — the selected Canvas FUI, with the new modal shade gradient. Self-contained mock mode, snapshot ingestion and SSE interface.
- **Canvas v3** — earlier approved living topology and inspector-modal design, retained as a baseline.

## Integration artifacts
- [Mock snapshot JSON](./dna.fui.mock.snapshot.json)
- [Snapshot JSON Schema](./dna.fui.snapshot.v1.schema.json)
- [Event JSON Schema](./dna.fui.event.v1.schema.json)
- [Sample event stream](./dna.fui.sample.events.jsonl)
- [Integration guide](./DNA_FUI_Integration_Guide.md)

## Modal update

```css
background: linear-gradient(54deg, #000000, #00000029, transparent);
```

No other visual redesign was made as part of v1.1. The dashboard uses **simulated data**; it is not attached to the production DNA engine.

To connect later:

```js
DNA_FUI.setSnapshot(snapshot, {source: 'api'});
DNA_FUI.ingest(event);
await DNA_FUI.connect({baseUrl:'/api/dna/fui',transport:'sse',pollMs:15000});
```
