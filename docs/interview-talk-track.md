# Interview talk track for this demo

Use this when practicing how to explain a full-stack project:

1. **Problem** — “Users need a simple task list with create/update/delete.”
2. **Architecture** — “Browser client → REST JSON API → in-memory store (swap for a real DB).”
3. **API surface** — `GET /health`, `GET/POST /api/tasks`, `PATCH/DELETE /api/tasks/:id`.
4. **Trade-offs** — in-memory is fine for teaching; production needs persistence, auth, validation, and tests.
5. **Next upgrades** — JWT auth, Postgres, React, deployment (Render/Fly/Railway), CI.

Practice saying this out loud in under 90 seconds, then deep-dive on any one endpoint.
