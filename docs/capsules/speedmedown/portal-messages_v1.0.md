# Capsule: portal-messages v1.0

Bidirectional chat between client and team. Live updates via SSE.

## Surface
- UI: `app/portal/messages/page.tsx` (client component, mounts SSE listener)
- REST: `app/api/portal/messages/route.ts` (GET history, POST new message)
- Stream: `app/api/portal/messages/stream/route.ts` (SSE)

## SSE conventions
- Endpoint: `/api/portal/messages/stream?since=<ISO>`
- **Heartbeat every 25s** to keep proxies from killing the connection.
- **Max connection 5 minutes**, then client reconnects.
- **`since` param** prevents replay on reconnect — pass the last received message timestamp.
- DB poll every 3s server-side.

## Filters
`isInternal: false` — internal team notes never reach the client stream.

## Anti-patterns
- Don't WebSocket this. Stack is SSE end-to-end and the infra (nginx → pm2) is tuned for it.
- Don't drop the heartbeat — connections die silently without it.
- Don't include internal messages in the stream payload, even filtered client-side.
